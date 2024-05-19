import {
  GameEntity,
  PlayableEntity,
  PlayableEntityAttackInput,
} from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { CoordService } from "src/game/map/services/coord/coord.service";
import { UseCase } from "src/types/use-case.interface";
import { CombatService } from "../services/combat/combat.service";
import { PlayableEntityAttackRepository } from "./playable-entity-attack.repository";

@Injectable()
export class PlayableEntityAttackUseCase implements UseCase {
  constructor(
    private readonly repository: PlayableEntityAttackRepository,
    private readonly combatService: CombatService,
    private readonly coordService: CoordService,
  ) {}

  public async execute({
    gameId,
    attackId,
    attackerPlayableEntityId,
    targetPlayableEntityId,
    userId,
  }: PlayableEntityAttackInput & { userId: User["id"] }): Promise<void> {
    const game = await this.repository.getGameById({ gameId });
    this.assertsCanAttack(game, {
      gameId,
      attackId,
      attackerPlayableEntityId,
      targetPlayableEntityId,
      userId,
    });

    await this.attackTarget({
      game,
      attackId,
      attackerPlayableEntityId,
      targetPlayableEntityId,
    });
    await this.repository.updateGame({ game });
  }

  private assertsCanAttack(
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

    if (attackerPlayableEntity.characteristic.actionPoints <= 0) {
      throw new ForbiddenException(
        "Attacker playable entity has no action points left",
      );
    }

    if (attackerPlayableEntity.type === "enemy") {
      // TODO: Si l'attaquant est un ennemi, vérifier qu'il n'a pas déjà attaqué ce tour ci.
    }

    const attack = attackerPlayableEntity.inventory.gear
      .flatMap(({ attacks }) => attacks.map((attack) => attack))
      .find((attack) => attack.id === attackId);
    if (!attack) {
      throw new ForbiddenException(
        "Attack item not found in the gear inventory of the attacker",
      );
    }

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

  private async attackTarget({
    game,
    attackId,
    attackerPlayableEntityId,
    targetPlayableEntityId,
  }: Pick<
    PlayableEntityAttackInput,
    "attackId" | "attackerPlayableEntityId" | "targetPlayableEntityId"
  > & { game: GameEntity }): Promise<void> {
    const attackerPlayableEntity = game.playableEntities[
      attackerPlayableEntityId
    ] as PlayableEntity;
    const targetPlayableEntity = game.playableEntities[
      targetPlayableEntityId
    ] as PlayableEntity;
    const attack = await this.repository.getAttackById({ attackId });

    attackerPlayableEntity.characteristic.actionPoints -= 1;
    this.combatService.attack({
      game,
      attackerPlayableEntity,
      targetPlayableEntity,
      attack,
    });
  }
}
