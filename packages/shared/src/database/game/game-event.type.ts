import { Coord } from "./coord.interface";
import { EnemyKind } from "./enemy-kind.type";

export type OnDoorOpeningGameEvent = {
  readonly name: "on_door_opening";
  readonly action: "spawn_monsters";
  readonly doorCoord: Coord;
  readonly monsters: Array<EnemyKind>;
  readonly startingTiles: Array<Coord>;
};

export type GameEvent = OnDoorOpeningGameEvent;
