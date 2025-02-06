import {
  TileEntityType,
  TileEntityTypeType,
} from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { Entity } from "src/modules/shared/domain/entity";
import { TileInteractiveEntity } from "./interactive/interactive.abstract";
import { TileNonInteractiveEntity } from "./non-interactive/non-interactive.entity";
import { TilePlayableEntity } from "./playable/playable.entity";

type Data = {
  readonly type: TileEntityTypeType;
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
    return this._data.type === TileEntityType.INTERACTIVE_ENTITY;
  }

  public isPlayable(): this is TilePlayableEntity {
    return this._data.type === TileEntityType.PLAYABLE_ENTITY;
  }

  public isNonInteractive(): this is TileNonInteractiveEntity {
    return this._data.type === TileEntityType.NON_INTERACTIVE_ENTITY;
  }
}
