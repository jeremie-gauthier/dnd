import { Entity } from "src/modules/shared/domain/entity";
import { TileInteractiveEntity } from "./interactive/interactive.abstract";
import { TileNonInteractiveEntity } from "./non-interactive/non-interactive.entity";
import { TilePlayableEntity } from "./playable/playable.entity";

type Data = {
  readonly type:
    | "playable-entity"
    | "interactive-entity"
    | "non-interactive-entity";
  isBlocking: boolean;
  [x: string]: any;
};

export abstract class TileEntity<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
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

  public isNonInteractive(): this is TileNonInteractiveEntity {
    return this._data.type === "non-interactive-entity";
  }
}
