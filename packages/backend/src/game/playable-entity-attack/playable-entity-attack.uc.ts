import {
  GameEntity,
  GameItem,
  PlayableEntity,
  PlayableEntityAttackInput,
} from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { CombatService } from "../services/combat/combat.service";
import { CoordService } from "../services/coord/coord.service";
import { PlayableEntityAttackRepository } from "./playable-entity-attack.repository";

@Injectable()
export class PlayableEntityAttackUseCase implements UseCase {
  constructor(
    private readonly repository: PlayableEntityAttackRepository,
    private readonly combatService: CombatService,
    private readonly coordService: CoordService,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    gameId,
    attackId,
    attackerPlayableEntityId,
    targetPlayableEntityId,
    userId,
  }: PlayableEntityAttackInput & { userId: User["id"] }): Promise<void> {
    const game = await this.repository.getGameById({ gameId });
    this.assertCanAttack(game, {
      gameId,
      attackId,
      attackerPlayableEntityId,
      targetPlayableEntityId,
      userId,
    });

    this.attackTarget({
      game,
      attackId,
      attackerPlayableEntityId,
      targetPlayableEntityId,
    });
    await this.backupService.updateGame({ game });
  }

  private assertCanAttack(
    game: GameEntity | null,
    {
      attackId,
      attackerPlayableEntityId,
      targetPlayableEntityId,
      userId,
    }: PlayableEntityAttackInput & { userId: User["id"] },
  ): asserts game is GameEntity {
    if (!game) {
      throw new NotFoundException("Game not found");
    }

    const attackerPlayableEntity =
      game.playableEntities[attackerPlayableEntityId];
    if (!attackerPlayableEntity) {
      throw new NotFoundException(
        "Attacker playable entity not found in this game",
      );
    }

    const targetPlayableEntity = game.playableEntities[targetPlayableEntityId];
    if (!targetPlayableEntity) {
      throw new NotFoundException(
        "Target playable entity not found in this game",
      );
    }

    if (attackerPlayableEntity.playedByUserId !== userId) {
      throw new ForbiddenException(
        "Cannot attack with a playable entity that you does not own",
      );
    }

    if (attackerPlayableEntity.currentPhase !== "action") {
      throw new ForbiddenException(
        "Cannot attack with a playable entity that is not in action phase",
      );
    }

    if (attackerPlayableEntity.characteristic.healthPoints <= 0) {
      throw new ForbiddenException(
        "Cannot attack with a playable entity that is not alive",
      );
    }

    if (targetPlayableEntity.characteristic.healthPoints <= 0) {
      throw new ForbiddenException(
        "Cannot attack a playable entity that is not alive",
      );
    }

    if (attackerPlayableEntity.characteristic.actionPoints <= 0) {
      throw new ForbiddenException(
        "Attacker playable entity has no action points left",
      );
    }

    if (
      attackerPlayableEntity.type === "enemy" &&
      attackerPlayableEntity.actionsDoneThisTurn.some(
        (action) => action.name === "attack",
      )
    ) {
      throw new ForbiddenException(
        "An enemy entity can only attack once per turn",
      );
    }

    const attackItem = attackerPlayableEntity.inventory.gear.find((gearItem) =>
      gearItem.attacks.some((attack) => attack.id === attackId),
    );
    if (!attackItem) {
      throw new ForbiddenException(
        "Attack item not found in the gear inventory of the attacker",
      );
    }

    if (
      attackItem.type === "Spell" &&
      attackerPlayableEntity.type === "hero" &&
      attackItem.manaCost[attackerPlayableEntity.class] === undefined
    ) {
      throw new ForbiddenException(
        "This class is not allowed to cast this spell",
      );
    }

    if (
      attackItem.type === "Spell" &&
      attackerPlayableEntity.type === "hero" &&
      attackerPlayableEntity.characteristic.manaPoints <
        attackItem.manaCost[attackerPlayableEntity.class]!
    ) {
      throw new ForbiddenException("Not enough mana to cast this spell");
    }

    const attack = attackItem.attacks.find((attack) => attack.id === attackId)!;
    const originTileIdx = this.coordService.coordToIndex({
      coord: attackerPlayableEntity.coord,
      metadata: { height: game.map.height, width: game.map.width },
    });
    const originTile = game.map.tiles[originTileIdx];
    if (
      !originTile ||
      !this.combatService.canAttackTarget({
        ally: attackerPlayableEntity.type,
        game,
        originTile,
        range: attack.range,
        targetCoord: targetPlayableEntity.coord,
      })
    ) {
      throw new ForbiddenException("Target playable entity is out of range");
    }
  }

  private attackTarget({
    game,
    attackId,
    attackerPlayableEntityId,
    targetPlayableEntityId,
  }: Pick<
    PlayableEntityAttackInput,
    "attackId" | "attackerPlayableEntityId" | "targetPlayableEntityId"
  > & { game: GameEntity }): void {
    const attackerPlayableEntity = game.playableEntities[
      attackerPlayableEntityId
    ] as PlayableEntity;
    const targetPlayableEntity = game.playableEntities[
      targetPlayableEntityId
    ] as PlayableEntity;
    const attackItem = attackerPlayableEntity.inventory.gear.find((gearItem) =>
      gearItem.attacks.some((attack) => attack.id === attackId),
    ) as GameItem;
    const attack = attackItem.attacks.find((attack) => attack.id === attackId)!;

    attackerPlayableEntity.characteristic.actionPoints -= 1;
    attackerPlayableEntity.actionsDoneThisTurn.push({ name: "attack" });
    if (attackItem.type === "Spell" && attackerPlayableEntity.type === "hero") {
      attackerPlayableEntity.characteristic.manaPoints -=
        attackItem.manaCost[attackerPlayableEntity.class]!;
    }

    this.combatService.attack({
      game,
      attackerPlayableEntity,
      targetPlayableEntity,
      attack,
      attackItem,
    });
  }
}
