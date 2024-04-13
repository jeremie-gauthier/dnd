import { Coord } from "../../database";

type Params = {
  coord: Coord;
};

export function getNeighbourCoords({
  coord: { row, column },
}: Params): [Coord, Coord, Coord, Coord] {
  return [
    { row: row - 1, column: column },
    { row: row + 1, column: column },
    { row: row, column: column - 1 },
    { row: row, column: column + 1 },
  ];
}
