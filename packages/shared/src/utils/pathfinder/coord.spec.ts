import { describe, expect, it } from "vitest";
import { coordToIndex, indexToCoord } from "./coord";

describe("pathfinder: coord", () => {
  const metadata = { width: 5, height: 7 };

  describe("coordToIndex", () => {
    it("should returns -1 when coord is out of metadata bounds", () => {
      expect(coordToIndex({ coord: { row: -3, column: 2 }, metadata })).toEqual(
        -1,
      );
      expect(coordToIndex({ coord: { row: 2, column: -4 }, metadata })).toEqual(
        -1,
      );
      expect(coordToIndex({ coord: { row: 7, column: 2 }, metadata })).toEqual(
        -1,
      );
      expect(coordToIndex({ coord: { row: 2, column: 5 }, metadata })).toEqual(
        -1,
      );
    });

    it("should returns a 1D-array index for the matching 2D coord", () => {
      expect(coordToIndex({ coord: { row: 0, column: 0 }, metadata })).toEqual(
        0,
      );
      expect(coordToIndex({ coord: { row: 0, column: 1 }, metadata })).toEqual(
        1,
      );
      expect(coordToIndex({ coord: { row: 2, column: 0 }, metadata })).toEqual(
        10,
      );
      expect(coordToIndex({ coord: { row: 3, column: 2 }, metadata })).toEqual(
        17,
      );
    });
  });

  describe("indexToCoord", () => {
    it("should returns a 2D coord for the 1D-array matching index", () => {
      expect(indexToCoord({ index: 0, metadata })).toStrictEqual({
        row: 0,
        column: 0,
      });
      expect(indexToCoord({ index: 1, metadata })).toStrictEqual({
        row: 0,
        column: 1,
      });
      expect(indexToCoord({ index: 10, metadata })).toStrictEqual({
        row: 2,
        column: 0,
      });
      expect(indexToCoord({ index: 17, metadata })).toStrictEqual({
        row: 3,
        column: 2,
      });
    });
  });
});
