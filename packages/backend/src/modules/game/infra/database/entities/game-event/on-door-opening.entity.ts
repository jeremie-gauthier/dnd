import { Coord } from "../coord.entity";
import { MonsterTemplate } from "../monster-template.entity";
import { GameEvent } from "./game-event.entity";

export class OnDoorOpening extends GameEvent {
  readonly name: "on_door_opening";
  readonly action: "spawn_monsters";
  readonly doorCoord: Coord;
  readonly monsters: Array<MonsterTemplate["race"]>;
  readonly startingTiles: Array<Coord>;
}
