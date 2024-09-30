import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../../../coord/coord.vo";

type Data = {
  topLeft: Coord;
  bottomRight: Coord;
};

export class BoundingBox extends Entity<Data> {
  private static schema = z.object({
    topLeft: z.instanceof(Coord),
    bottomRight: z.instanceof(Coord),
  });

  constructor(rawData: Data) {
    const data = BoundingBox.schema.parse(rawData);
    super(data);
  }

  public getContainedCoords() {
    const nbColumns = this._data.bottomRight.column - this._data.topLeft.column;
    const nbRows = this._data.bottomRight.row - this._data.topLeft.row;

    const coords: Coord[] = [];
    for (let rowIdx = 0; rowIdx <= nbRows; rowIdx += 1) {
      for (let colIdx = 0; colIdx <= nbColumns; colIdx += 1) {
        coords.push(
          new Coord({
            row: this._data.topLeft.row + rowIdx,
            column: this._data.topLeft.row + colIdx,
          }),
        );
      }
    }
    return coords;
  }

  public contains({ coord }: { coord: Coord }) {
    return (
      coord.column >= this._data.topLeft.column &&
      coord.column <= this._data.bottomRight.column &&
      coord.row >= this._data.topLeft.row &&
      coord.row <= this._data.bottomRight.row
    );
  }

  public toPlain(): PlainData<Data> {
    return {
      topLeft: this._data.topLeft.toPlain(),
      bottomRight: this._data.bottomRight.toPlain(),
    };
  }
}
