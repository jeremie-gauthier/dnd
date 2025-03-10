import {
  EntityType,
  EntityTypeType,
} from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { Entity } from "src/modules/shared/domain/entity";
import { TileNonPlayableEntity } from "./non-playable/non-playable.entity";
import { TilePlayableEntity } from "./playable/playable.entity";

type Data = {
  readonly type: EntityTypeType;
  readonly isBlocking: boolean;
  [x: string]: any;
};

export abstract class TileEntity<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  constructor(rawData: ChildData) {
    super(rawData, rawData.id);
  }

  //#region Getters

  public get type() {
    return this._data.type;
  }

  public get isBlocking() {
    return this._data.isBlocking;
  }

  public get isTraversible() {
    return !this._data.isBlocking;
  }

  // #region Methods

  public isPlayable(): this is TilePlayableEntity {
    return this._data.type === EntityType.PLAYABLE_ENTITY;
  }

  public isNonPlayable(): this is TileNonPlayableEntity {
    return this._data.type !== EntityType.PLAYABLE_ENTITY;
  }
}
