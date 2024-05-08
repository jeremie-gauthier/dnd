import { EnemyKind } from "./enemy-kind.type";
import { Coord } from "./game.interface";

export type OnDoorOpeningGameEvent = {
  name: "on_door_opening";
  doorCoord: Coord;
  action: "spawn_enemies";
  enemies: EnemyKind[];
  startingTiles: Coord[];
};

export type GameEvent = OnDoorOpeningGameEvent;
