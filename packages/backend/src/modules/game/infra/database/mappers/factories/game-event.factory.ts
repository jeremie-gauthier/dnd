import { Coord as CoordDomain } from "src/modules/game/domain/coord/coord.vo";
import { GameEvent } from "src/modules/game/domain/game-events/game-event/game-event.abstract";
import { OnDoorOpeningSpawnMonsters } from "src/modules/game/domain/game-events/game-event/on-door-opening/spawn-monsters.entity";
import { GameEvent as GameEventPersistence } from "src/modules/game/infra/database/entities/game-event/game-event.entity";
import { Coord as CoordPersistence } from "../../entities/coord.entity";
import { MonsterTemplate as MonsterTemplatePersistence } from "../../entities/game-entity/playable-entity/template/monster-template.entity";
import { Room as RoomPersistence } from "../../entities/room/room.entity";
import { GameEventAction } from "../../enums/game-event-action.enum";
import { GameEventName } from "../../enums/game-event-name.enum";

export class GameEventFactory {
  private constructor() {}

  public static create(event: GameEventPersistence): GameEvent {
    switch (event.name) {
      case GameEventName.ON_DOOR_OPENING:
        return GameEventFactory.createDoorOpeningEvent(event);
    }
  }

  private static createDoorOpeningEvent(
    event: GameEventPersistence,
  ): OnDoorOpeningSpawnMonsters {
    switch (event.action) {
      case GameEventAction.SPAWN_MONSTERS: {
        const data = event.data as {
          doorCoord: CoordPersistence;
          monsters: Array<MonsterTemplatePersistence>;
          startingRooms: Array<RoomPersistence["id"]>;
        };
        return new OnDoorOpeningSpawnMonsters({
          data: {
            doorCoord: new CoordDomain(data.doorCoord),
            monsters: data.monsters.map((monster) => monster.race),
            startingRooms: data.startingRooms,
          },
        });
      }
      default:
        throw new Error(
          `Event action '${event.action}' not found for instantiation`,
        );
    }
  }
}
