import {
  EnemyKind,
  GameEntity,
  PlayableEnemyEntity,
  PlayableEntity,
} from "@dnd/shared";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";

@Injectable()
export class PlayableEntityService {
  public createEnemies({
    game,
    enemiesName,
  }: { game: GameEntity; enemiesName: EnemyKind[] }): PlayableEnemyEntity[] {
    return enemiesName.map((enemyName) => {
      const enemyTemplate = game.enemyTemplates[enemyName]!;
      const id = `${enemyName}:${randomUUID()}`;

      return {
        id,
        type: "enemy",
        currentPhase: "idle",
        playedByUserId: game.gameMaster.userId,
        name: id,
        kind: enemyName,
        initiative: Number.NaN,
        isBlocking: true,
        coord: { row: Number.NaN, column: Number.NaN },
        characteristic: {
          ...enemyTemplate.characteristic,
          healthPoints: enemyTemplate.characteristic.baseHealthPoints,
          manaPoints: enemyTemplate.characteristic.baseManaPoints,
          armorClass: enemyTemplate.characteristic.baseArmorClass,
          movementPoints: enemyTemplate.characteristic.baseMovementPoints,
          actionPoints: enemyTemplate.characteristic.baseActionPoints,
        },
        inventory: enemyTemplate.inventory,
        actionsDoneThisTurn: [],
      };
    });
  }

  public mustBeAbleToAct(
    playableEntity: PlayableEntity,
  ): asserts playableEntity is PlayableEntity {
    if (playableEntity.characteristic.actionPoints <= 0) {
      throw new ForbiddenException(
        "Cannot act with a playable entity that has no action points left",
      );
    }
  }

  public mustBeInActionPhase(
    playableEntity: PlayableEntity,
  ): asserts playableEntity is PlayableEntity & { currentPhase: "action" } {
    if (playableEntity.currentPhase !== "action") {
      throw new ForbiddenException(
        "Cannot act with a playable entity that is not in action phase",
      );
    }
  }

  public mustBeAlive(
    playableEntity: PlayableEntity,
  ): asserts playableEntity is PlayableEntity {
    if (playableEntity.characteristic.healthPoints <= 0) {
      throw new ForbiddenException(
        "Cannot act with a playable entity that is not alive",
      );
    }
  }
}
