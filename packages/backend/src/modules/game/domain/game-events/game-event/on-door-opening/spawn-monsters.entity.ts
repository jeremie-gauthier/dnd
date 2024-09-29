import { PlayableEntityRaceType } from "@dnd/shared";
import { Coord } from "../../../coord/coord.vo";
import { DoorOpeningEvent } from "./door-opening-event.abstract";

type Data = {
  readonly name: "on_door_opening";
  readonly action: "spawn_monsters";
  readonly doorCoord: Coord;
  readonly monsters: Array<PlayableEntityRaceType>;
  readonly startingTiles: Array<Coord>;
};

export class OnDoorOpeningSpawnMonsters extends DoorOpeningEvent<Data> {
  public get monsters() {
    return this._data.monsters;
  }

  public get startingTiles() {
    return this._data.startingTiles;
  }

  public toPlain() {
    return {
      action: this._data.action,
      doorCoord: this._data.doorCoord.toPlain(),
      monsters: this._data.monsters as any,
      name: this._data.name,
      startingTiles: this._data.startingTiles.map((startingTile) =>
        startingTile.toPlain(),
      ),
    };
  }
}
