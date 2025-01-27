import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { GameEvent } from "../../domain/game-events/game-event/game-event.abstract";
import { OnDoorOpeningSpawnMonsters } from "../../domain/game-events/game-event/on-door-opening/spawn-monsters.entity";
import { GameEvent as GameEventPersistence } from "../../infra/database/entities/game-event/game-event.entity";
import { OnDoorOpening as OnDoorOpeningPersistence } from "../../infra/database/entities/game-event/on-door-opening.entity";

export class GameEventFactory {
  private constructor() {}

  public static create(event: GameEventPersistence): GameEvent {
    switch (event.name) {
      case "on_door_opening":
        return GameEventFactory.createDoorOpeningEvent(
          event as OnDoorOpeningPersistence,
        );
    }
  }

  private static createDoorOpeningEvent(
    event: OnDoorOpeningPersistence,
  ): OnDoorOpeningSpawnMonsters {
    switch (event.action) {
      case "spawn_monsters":
        return new OnDoorOpeningSpawnMonsters({
          ...event,
          doorCoord: new Coord(event.doorCoord),
          monsters: event.monsters,
          startingTiles: event.startingTiles.map(
            (startingTile) => new Coord(startingTile),
          ),
        });
    }
  }
}
