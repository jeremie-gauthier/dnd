import { Coord } from "../../../coord/coord.vo";
import { GameEvent } from "../game-event.abstract";
import { OnDoorOpeningSpawnMonsters } from "./spawn-monsters.entity";

type Data = {
  readonly name: "on_door_opening";
  readonly action: "spawn_monsters";
  readonly doorCoord: Coord;
  [key: string]: any;
};

export abstract class DoorOpeningEvent<
  ChildData extends Data = Data,
> extends GameEvent<ChildData> {
  public get doorCoord() {
    return this._data.doorCoord;
  }

  public isSpawnMonsterAction(): this is OnDoorOpeningSpawnMonsters {
    return this._data.action === "spawn_monsters";
  }
}
