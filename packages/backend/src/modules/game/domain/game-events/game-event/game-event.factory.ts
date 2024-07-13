import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { GameEventDeserialized } from "src/modules/shared/interfaces/game-events-deserialized.interface";
import { GameEvent } from "./game-event.abstract";
import { OnDoorOpeningSpawnMonsters } from "./on-door-opening/spawn-monsters.entity";

export class GameEventFactory {
  private constructor() {}

  public static create(event: GameEventDeserialized): GameEvent {
    switch (event.name) {
      case "on_door_opening":
        return GameEventFactory.createDoorOpeningEvent(event);
    }
  }

  private static createDoorOpeningEvent(
    event: Extract<GameEventDeserialized, { name: "on_door_opening" }>,
  ): GameEvent {
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
