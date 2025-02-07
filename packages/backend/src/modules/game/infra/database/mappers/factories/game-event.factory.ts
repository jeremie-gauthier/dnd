import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { GameEvent } from "src/modules/game/domain/game-events/game-event/game-event.abstract";
import { OnDoorOpeningSpawnMonsters } from "src/modules/game/domain/game-events/game-event/on-door-opening/spawn-monsters.entity";
import { GameEvent as GameEventPersistence } from "src/modules/game/infra/database/entities/game-event/game-event.entity";
import { OnDoorOpening as OnDoorOpeningPersistence } from "src/modules/game/infra/database/entities/game-event/on-door-opening.entity";
import { GameEventAction } from "../../enums/game-event-action.enum";
import { GameEventName } from "../../enums/game-event-name.enum";

export class GameEventFactory {
  private constructor() {}

  public static create(event: GameEventPersistence): GameEvent {
    switch (event.name) {
      case GameEventName.ON_DOOR_OPENING:
        return GameEventFactory.createDoorOpeningEvent(
          event as OnDoorOpeningPersistence,
        );
    }
  }

  private static createDoorOpeningEvent(
    event: OnDoorOpeningPersistence,
  ): OnDoorOpeningSpawnMonsters {
    switch (event.action) {
      case GameEventAction.SPAWN_MONSTERS:
        return new OnDoorOpeningSpawnMonsters({
          ...event,
          doorCoord: new Coord(event.doorCoord),
          monsters: event.monsters.map((monster) => monster.race),
          startingTiles: event.startingRoom.tiles.map(
            (tile) => new Coord(tile.coord),
          ),
        });
    }
  }
}
