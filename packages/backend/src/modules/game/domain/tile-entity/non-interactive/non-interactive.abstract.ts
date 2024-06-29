import { TileEntity } from "../tile-entity.abstract";

type Data = {
  readonly type: "non-interactive-entity";
  readonly kind: "off-map" | "pillar" | "tree" | "wall";
  readonly isBlocking: boolean;
  readonly isVisible: boolean;
};

export class TileNonInteractiveEntity extends TileEntity<Data> {
  public toPlain() {
    return {
      type: this._data.type,
      kind: this._data.kind,
      isBlocking: this._data.isBlocking,
      isVisible: this._data.isVisible,
    };
  }
}
