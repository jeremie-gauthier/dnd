import {
  GameView,
  coordToIndex,
  getNeighbourCoords,
  indexToCoord,
} from "@dnd/shared";
import { ValueObject } from "src/modules/shared/domain/value-object";
import { CoordError } from "./coord.error";

type Data = {
  row: number;
  column: number;
};

export class Coord extends ValueObject<Data> {
  constructor(data: Data) {
    if (data.row < 0) {
      throw new CoordError({
        name: "NEGATIVE_COORD",
        message: "Invalid row coord (negative)",
      });
    }
    if (data.column < 0) {
      throw new CoordError({
        name: "NEGATIVE_COORD",
        message: "Invalid column coord (negative)",
      });
    }
    super(data);
  }

  get row() {
    return this._data.row;
  }

  get column() {
    return this._data.column;
  }

  public equals(other: Coord): boolean {
    return this.row === other.row && this.column === other.column;
  }

  public isUndefined(): boolean {
    return Number.isNaN(this.row) || Number.isNaN(this.column);
  }

  public isAdjacentTo(other: Coord): boolean {
    const neighbours = this.getNeighbours();
    return neighbours.some((neighbour) => other.equals(neighbour));
  }

  public getNeighbours(): Array<Coord> {
    return getNeighbourCoords({
      coord: { row: this.row, column: this.column },
    })
      .map((coord) => {
        try {
          return new Coord(coord);
        } catch {
          return null;
        }
      })
      .filter((coord) => coord !== null);
  }

  public toIndex(
    metadata: Readonly<Pick<GameView["map"], "width" | "height">>,
  ): number {
    const index = coordToIndex({
      coord: { row: this.row, column: this.column },
      metadata,
    });

    if (index < 0) {
      throw new CoordError({
        name: "BAD_COORD_INDEX",
        message: "Invalid index for given metadata",
      });
    }

    return index;
  }

  public static fromIndex(
    index: number,
    metadata: Readonly<Pick<GameView["map"], "width" | "height">>,
  ): Coord {
    if (index >= metadata.height * metadata.width) {
      throw new CoordError({
        name: "BAD_COORD_INDEX",
        message: "Invalid index for given metadata",
      });
    }

    const coord = indexToCoord({ index, metadata });
    return new Coord(coord);
  }

  public toPlain() {
    return { row: this._data.row, column: this._data.column };
  }

  public toString() {
    return `row: ${this.row}; column: ${this.column}`;
  }
}
