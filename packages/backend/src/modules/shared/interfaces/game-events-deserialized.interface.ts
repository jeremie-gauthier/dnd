import { Coord, PlayableEntityRaceType } from "@dnd/shared";

export type OnDoorOpeningGameEvent = {
  readonly name: "on_door_opening";
  readonly action: "spawn_monsters";
  readonly doorCoord: Coord;
  readonly monsters: Array<PlayableEntityRaceType>;
  readonly startingTiles: Array<Coord>;
};

export type GameEventDeserialized = OnDoorOpeningGameEvent;
