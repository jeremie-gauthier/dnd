import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Tile } from "../tile/tile.entity";

type Data = {
  width: number;
  height: number;
  tiles: Array<Tile>;
};

// TODO: pourrait etre un aggregate plutot qu'une entity
export class Board extends Entity<Data> {
  private static schema = z
    .object({
      width: z.number().min(1),
      height: z.number().min(1),
      tiles: z.array(z.instanceof(Tile)),
    })
    .refine(({ width, height, tiles }) => {
      return tiles.length === width * height;
    });

  constructor(rawData: Data) {
    const data = Board.schema.parse(rawData);
    super(data);
  }

  public toPlain() {
    return {
      width: this._data.width,
      height: this._data.height,
      tiles: this._data.tiles.map((tile) => tile.toPlain()),
    };
  }
}
