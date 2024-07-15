import { Entity, type PlainData } from "src/modules/shared/domain/entity";
import { TileInteractiveEntity } from "./interactive/interactive.abstract";
import { TilePlayableEntity } from "./playable/playable.entity";

type Data = {
  readonly type:
    | "playable-entity"
    | "interactive-entity"
    | "non-interactive-entity";
  [x: string]: any;
};

export abstract class TileEntity<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  public abstract toPlain(): PlainData<ChildData>;

  constructor(rawData: ChildData) {
    super(rawData, rawData.id);
  }

  get isBlocking() {
    return this._data.isBlocking;
  }

  get isTraversible() {
    return !this._data.isBlocking;
  }

  public isInteractive(): this is TileInteractiveEntity {
    return this._data.type === "interactive-entity";
  }

  public isPlayable(): this is TilePlayableEntity {
    return this._data.type === "playable-entity";
  }
}
