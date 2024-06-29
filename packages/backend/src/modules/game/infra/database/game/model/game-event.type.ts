import { Coord } from "./coord.type";
import { MonsterTemplate } from "./playable-entity/monster-template.type";

type OnDoorOpeningGameEvent = {
  readonly name: "on_door_opening";
  readonly action: "spawn_monsters";
  readonly doorCoord: Coord;
  readonly monsters: Array<MonsterTemplate["kind"]>;
  readonly startingTiles: Array<Coord>;
};

export type GameEvent = OnDoorOpeningGameEvent;
