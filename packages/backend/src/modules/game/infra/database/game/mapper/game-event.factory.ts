import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { GameEvent } from "src/modules/game/game-event/game-event.abstract";
import { OnDoorOpeningSpawnMonsters } from "src/modules/game/game-event/on-door-opening/spawn-monsters.entity";
import { GamePersistence } from "../model/game.model";

export class GameEventFactory {
  private constructor() {}

  public static create(event: GamePersistence["events"][number]): GameEvent {
    switch (event.name) {
      case "on_door_opening":
        return GameEventFactory.createDoorOpeningEvent(event);
    }
  }

  private static createDoorOpeningEvent(
    event: Extract<
      GamePersistence["events"][number],
      { name: "on_door_opening" }
    >,
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
