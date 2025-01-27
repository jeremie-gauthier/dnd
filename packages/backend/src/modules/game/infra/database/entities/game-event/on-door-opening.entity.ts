import { GameEventAction } from "../../enums/game-event-action.enum";
import { GameEventName } from "../../enums/game-event-name.enum";
import { Coord } from "../coord.entity";
import { MonsterTemplate } from "../monster-template.entity";
import { GameEvent } from "./game-event.entity";

export class OnDoorOpening extends GameEvent {
  readonly name = GameEventName.ON_DOOR_OPENING;
  readonly action = GameEventAction.SPAWN_MONSTERS;
  readonly doorCoord: Coord;
  readonly monsters: Array<MonsterTemplate["race"]>;
  readonly startingTiles: Array<Coord>;
}
