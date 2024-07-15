import {
  GameItem,
  GameView,
  PlayableEntity,
  PlayableEntityAttackInput,
} from "@dnd/shared";
import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { PlayableEntityService } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.service";
import { CombatService } from "../../../domain/combat/combat.service";
import { MapService } from "../../../domain/map/map.service";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";

@Injectable()
export class PlayableEntityAttackUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly combatService: CombatService,
    private readonly playableEntityService: PlayableEntityService,
    private readonly mapService: MapService,
  ) {}

  public async execute({
    gameId,
    attackId,
    attackerPlayableEntityId,
    targetPlayableEntityId,
    userId,
  }: PlayableEntityAttackInput & { userId: User["id"] }): Promise<void> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });
    // this.mustExecute({
    //   game,
    //   gameId,
    //   attackId,
    //   attackerPlayableEntityId,
    //   targetPlayableEntityId,
    //   userId,
    // });

    // this.attackTarget({
    //   game,
    //   attackId,
    //   attackerPlayableEntityId,
    //   targetPlayableEntityId,
    // });
    // await this.backupService.updateGame({ game });
  }

  private mustExecute({
    game,
    attackId,
    attackerPlayableEntityId,
    targetPlayableEntityId,
    userId,
  }: PlayableEntityAttackInput & { game: GameView; userId: User["id"] }) {
    const attackerPlayableEntity =
      this.playableEntityService.getPlayableEntityOrThrow({
        game,
        playableEntityId: attackerPlayableEntityId,
      });
    this.playableEntityService.mustBePlayedByUserId({
      playableEntity: attackerPlayableEntity,
      userId,
    });
    this.playableEntityService.mustBeInActionPhase(attackerPlayableEntity);
    this.playableEntityService.mustBeAlive(attackerPlayableEntity);
    this.playableEntityService.mustBeAbleToAct(attackerPlayableEntity);

    const targetPlayableEntity =
      this.playableEntityService.getPlayableEntityOrThrow({
        game,
        playableEntityId: targetPlayableEntityId,
      });
    this.playableEntityService.mustBeAlive(targetPlayableEntity);

    // if (
    //   attackerPlayableEntity.faction === "enemy" &&
    //   attackerPlayableEntity.actionsDoneThisTurn.some(
    //     (action) => action.name === "attack",
    //   )
    // ) {
    //   throw new ForbiddenException(
    //     "An enemy entity can only attack once per turn",
    //   );
    // }

    const attackItem = this.playableEntityService.getAttackItemOrThrow({
      attackId,
      playableEntity: attackerPlayableEntity,
    });
    this.playableEntityService.mustHaveItemInGear({
      item: attackItem,
      playableEntity: attackerPlayableEntity,
    });

    if (
      attackItem.type === "Spell" &&
      attackerPlayableEntity.faction === "hero" &&
      attackItem.manaCost[attackerPlayableEntity.class] === undefined
    ) {
      throw new ForbiddenException(
        "This class is not allowed to cast this spell",
      );
    }

    if (
      attackItem.type === "Spell" &&
      attackerPlayableEntity.faction === "hero" &&
      attackerPlayableEntity.characteristic.manaPoints <
        attackItem.manaCost[attackerPlayableEntity.class]!
    ) {
      throw new ForbiddenException("Not enough mana to cast this spell");
    }

    const attack = attackItem.attacks.find((attack) => attack.id === attackId)!;
    const originTile = this.mapService.getTileOrThrow({
      coord: attackerPlayableEntity.coord,
      game,
    });
    this.combatService.mustHaveTargetInRange({
      ally: attackerPlayableEntity.faction,
      game,
      originTile,
      range: attack.range,
      targetCoord: targetPlayableEntity.coord,
    });
  }

  private attackTarget({
    game,
    attackId,
    attackerPlayableEntityId,
    targetPlayableEntityId,
  }: Pick<
    PlayableEntityAttackInput,
    "attackId" | "attackerPlayableEntityId" | "targetPlayableEntityId"
  > & { game: GameView }): void {
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
    // attackerPlayableEntity.actionsDoneThisTurn.push({ name: "attack" });
    if (
      attackItem.type === "Spell" &&
      attackerPlayableEntity.faction === "hero"
    ) {
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
