import { GameLog, sum } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { LoggableAction } from "./loggable-action.interface";

@Injectable()
export class LogService {
  public createLog(payload: LoggableAction): GameLog | undefined {
    switch (payload.name) {
      case GameEvent.PlayableEntityMoved:
        return {
          type: GameEvent.PlayableEntityMoved,
          createdAt: new Date(),
          data: { entityName: payload.playableEntity.name },
        };
      case GameEvent.PlayableEntityTurnEnded:
        return {
          type: GameEvent.PlayableEntityTurnEnded,
          createdAt: new Date(),
          data: { entityName: payload.playableEntity.name },
        };
      case GameEvent.DoorOpened:
        return {
          type: GameEvent.DoorOpened,
          createdAt: new Date(),
          data: { entityName: payload.entityThatOpenedTheDoor.name },
        };
      case GameEvent.PlayableEntityTurnStarted:
        return {
          type: GameEvent.PlayableEntityTurnStarted,
          createdAt: new Date(),
          data: { entityName: payload.playableEntity.name },
        };
      case GameEvent.InitiativesRerolled:
        return {
          type: GameEvent.InitiativesRerolled,
          createdAt: new Date(),
          data: {},
        };
      case GameEvent.MonstersSpawned:
        return {
          type: GameEvent.MonstersSpawned,
          createdAt: new Date(),
          data: {},
        };
      case GameEvent.EntityAttacked: {
        const diceScore = sum(
          ...payload.dicesResults
            .filter(({ dice }) => dice.name !== "special")
            .map(({ result }) => result),
        );

        return {
          type: GameEvent.EntityAttacked,
          createdAt: new Date(),
          data: {
            attackItemUsedName: payload.attackItemUsed.name,
            attackPower: payload.damageDone,
            diceRollResults: payload.dicesResults.map((diceResult) => ({
              name: diceResult.dice.name,
              color: "#fff",
              result: diceResult.result,
            })),
            bonusScore: payload.damageDone - diceScore,
            diceScore,
            attackerEntityName: payload.attacker.name,
            targetEntityName: payload.target.name,
          },
        };
      }
      case GameEvent.EntityTookDamage:
        return {
          type: GameEvent.EntityTookDamage,
          createdAt: new Date(),
          data: {
            damageDone: payload.amount,
            entityHpLeft: payload.target.characteristic.healthPoints,
            entityName: payload.target.name,
          },
        };
      case GameEvent.EntityDied:
        return {
          type: GameEvent.EntityDied,
          createdAt: new Date(),
          data: { entityName: payload.target.name },
        };
      case GameEvent.GameWon:
        return {
          type: GameEvent.GameWon,
          createdAt: new Date(),
          data: {},
        };
      case GameEvent.ChestTrapTriggered:
        return {
          type: GameEvent.ChestTrapTriggered,
          createdAt: new Date(),
          data: {
            chestTrapName: payload.chestTrapItem.name,
            subjectEntityName: payload.subjectEntity.name,
          },
        };
    }
  }
}
