import { EnemyKind, GameEntity, PlayableEnemyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
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
}
