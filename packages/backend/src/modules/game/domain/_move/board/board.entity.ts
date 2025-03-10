import { ArrayCollection } from "src/modules/shared/domain/collections/array.collection";
import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../../common/coord/coord.vo";
import { TileEntity } from "../tile/tile-entity/tile-entity.abstract";
import { Tile } from "../tile/tile.entity";
import { BoardError } from "./board.error";

type Data = {
  width: number;
  height: number;
  tiles: ArrayCollection<Tile>;
};

export class Board extends Entity<Data> {
  private static readonly schema = z
    .object({
      width: z.number().min(1),
      height: z.number().min(1),
      tiles: z.instanceof(ArrayCollection<Tile>),
    })
    .refine(({ width, height, tiles }) => {
      return tiles.length === width * height;
    });

  constructor(rawData: Data) {
    const data = Board.schema.parse(rawData);
    super(data);
  }

  // #region Getters

  public get width() {
    return this._data.width;
  }

  public get height() {
    return this._data.height;
  }

  public get tiles() {
    return this._data.tiles;
  }

  // #region Methods

  public override toPlain() {
    return {} as any;
  }

  public removeEntityAtCoord({
    tileEntity,
    coord,
  }: { tileEntity: TileEntity; coord: Coord }) {
    const tile = this.getTileOrThrow({ coord });
    tile.removeEntity({ tileEntity });
  }

  public addEntityAtCoord({
    tileEntity,
    coord,
  }: { tileEntity: TileEntity; coord: Coord }) {
    const tile = this.getTileOrThrow({ coord });
    tile.addEntity({ tileEntity });
  }

  public getTileOrThrow({ coord }: { coord: Coord }) {
    const coordIdx = coord.toIndex({
      width: this._data.width,
      height: this._data.height,
    });
    const tile = this._data.tiles.at(coordIdx);
    if (!tile) {
      throw new BoardError({
        name: "OUT_OF_RANGE_COORD",
        message: `No tile found at coord [${coord}]`,
      });
    }
    return tile;
  }

  public mustBeAnAccessibleTile({ coord }: { coord: Coord }) {
    const tile = this.getTileOrThrow({ coord });
    if (tile.entities.some((entity) => entity.isBlocking)) {
      throw new BoardError({
        name: "TILE_NOT_ACCESSIBLE",
        message: "Destination tile is blocked by an entity",
      });
    }
  }
}
