import { describe, expect, it } from "vitest";
import { getNeighbourCoords } from "./get-neighbours-coords";

describe("pathfinder: getNeighbourCoords", () => {
  it("should return a 4-tuple of the neighbouring coords", () => {
    expect(getNeighbourCoords({ coord: { row: 2, column: 4 } })).toStrictEqual([
      { row: 1, column: 4 },
      { row: 3, column: 4 },
      { row: 2, column: 3 },
      { row: 2, column: 5 },
    ]);
  });
});
