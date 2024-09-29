import { PlayableEntityRaceType } from "../enums/playable-entity-race.enum";
import { Coord } from "./coord.interface";

export type OnDoorOpeningGameEvent = {
  readonly name: "on_door_opening";
  readonly action: "spawn_monsters";
  readonly doorCoord: Coord;
  readonly monsters: Array<PlayableEntityRaceType>;
  readonly startingTiles: Array<Coord>;
};

export type GameEvent = OnDoorOpeningGameEvent;
