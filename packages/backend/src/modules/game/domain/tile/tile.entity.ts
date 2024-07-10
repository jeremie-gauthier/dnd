import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../coord/coord.vo";
import { TileEntity } from "../tile-entity/tile-entity.abstract";

type Data = {
  coord: Coord;
  entities: Array<TileEntity>;
  isStartingTile?: true;
};

// TODO: pourrait etre un aggregate plutot qu'une entity
export class Tile extends Entity<Data> {
  private static schema = z.object({
    coord: z.instanceof(Coord),
    entities: z.array(z.instanceof(TileEntity)),
    isStartingTile: z.literal(true).optional(),
  });

  constructor(rawData: Data) {
    const data = Tile.schema.parse(rawData);
    super(data);
  }

  public toPlain() {
    return {
      coord: this._data.coord.toPlain(),
      entities: this._data.entities.map((gameEntity) => gameEntity.toPlain()),
      isStartingTile: this._data.isStartingTile,
    };
  }

  public removeEntity({ tileEntity }: { tileEntity: TileEntity }) {
    this._data.entities = this._data.entities.filter(
      (entity) => !entity.equals(tileEntity),
    );
  }

  public addEntity({ tileEntity }: { tileEntity: TileEntity }) {
    this._data.entities.push(tileEntity);
  }
}
