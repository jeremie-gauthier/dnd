import { EnemyKind } from "@dnd/shared";
import { Coord } from "../../coord/coord.vo";
import { GameEvent } from "../game-event.abstract";

type Data = {
  readonly name: "on_door_opening";
  readonly action: "spawn_monsters";
  readonly doorCoord: Coord;
  readonly monsters: Array<EnemyKind>;
  readonly startingTiles: Array<Coord>;
};

export class OnDoorOpeningSpawnMonsters extends GameEvent<Data> {
  public toPlain() {
    return {
      action: this._data.action,
      doorCoord: this._data.doorCoord.toPlain(),
      monsters: this._data.monsters,
      name: this._data.name,
      startingTiles: this._data.startingTiles.map((startingTile) =>
        startingTile.toPlain(),
      ),
    };
  }
}
