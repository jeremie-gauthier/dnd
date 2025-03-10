import { ArrayCollection } from "src/modules/shared/domain/collections/array.collection";
import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../../common/coord/coord.vo";
import { TileNonPlayableEntity } from "./tile-entity/non-playable/non-playable.entity";
import { TileEntity } from "./tile-entity/tile-entity.abstract";

type Data = {
  coord: Coord;
  entities: ArrayCollection<TileEntity>;
  isStartingTile: boolean;
};

export class Tile extends Entity<Data> {
  private static readonly schema = z.object({
    coord: z.instanceof(Coord),
    entities: z.instanceof(ArrayCollection<TileEntity>),
    isStartingTile: z.boolean(),
  });

  constructor(rawData: Data) {
    const data = Tile.schema.parse(rawData);
    super(data);
  }

  // #region Getters

  public get coord() {
    return this._data.coord;
  }

  public get entities() {
    return this._data.entities;
  }

  public get isStartingTile() {
    return this._data.isStartingTile;
  }

  // #region Methods

  public override toPlain() {
    return {} as any;
  }

  public removeEntity({ tileEntity }: { tileEntity: TileEntity }) {
    this._data.entities = this._data.entities.filter(
      (entity) => !entity.equals(tileEntity),
    );
  }

  public addEntity({ tileEntity }: { tileEntity: TileEntity }) {
    this._data.entities.add(tileEntity);
  }

  public getActiveTrap() {
    return this.entities.getOneBy(
      (tileEntity) =>
        tileEntity.isNonPlayable() &&
        tileEntity.isTrap() &&
        tileEntity.canInteract,
    ) as TileNonPlayableEntity | null;
  }

  // public isBlockedByNonInteractiveEntity() {
  //   return this._data.entities.some((entity) => entity.isNonInteractive());
  // }
}
