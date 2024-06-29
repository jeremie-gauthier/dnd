import { TilePath } from "@dnd/shared";
import { PlayableEntity } from "src/modules/game/infra/database/game/model/playable-entity/playable.type";
import { TileEntity } from "../tile-entity.abstract";

export interface BehaviourMove {
  move(_: { path: TilePath }): void;
}

type Data = {
  type: "playable-entity";
  id: PlayableEntity["id"];
};

export class TilePlayableEntity extends TileEntity<Data> {
  public toPlain() {
    return {
      id: this._data.id,
      type: this._data.type,
    };
  }
}
