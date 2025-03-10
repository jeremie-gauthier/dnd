import { describe, expect, it } from "vitest";
import { CoordError } from "./coord.error";
import { Coord } from "./coord.vo";

describe("Coord VO", () => {
  describe("constructor", () => {
    it("should create a new Coord when inputs are valid", () => {
      expect(new Coord({ row: 0, column: 0 })).toBeInstanceOf(Coord);
      expect(new Coord({ row: 1, column: 2 })).toBeInstanceOf(Coord);
      expect(new Coord({ row: 2, column: 4 })).toBeInstanceOf(Coord);
    });

    it("should throw when `row` is < 0", () => {
      expect(() => new Coord({ row: -1, column: 0 })).toThrow(CoordError);
      expect(
        () => new Coord({ row: Number.NEGATIVE_INFINITY, column: 0 }),
      ).toThrow();
    });

    it("should throw when `column` is < 0", () => {
      expect(() => new Coord({ row: 0, column: -1 })).toThrow(CoordError);
      expect(
        () => new Coord({ row: 0, column: Number.NEGATIVE_INFINITY }),
      ).toThrow();
    });
  });

  describe("getters", () => {
    it("should return the correct values", () => {
      const coord = new Coord({ row: 12, column: 24 });

      expect(coord.row).toBe(12);
      expect(coord.column).toBe(24);
    });
  });

  describe("equals method", () => {
    it("should return true when values are equals", () => {
      const a = new Coord({ row: 21, column: 42 });
      const b = new Coord({ row: 21, column: 42 });

      expect(a).not.toBe(b);
      expect(a.equals(b)).toBe(true);
      expect(b.equals(a)).toBe(true);
    });

    it("should return false when values are not equals", () => {
      const a = new Coord({ row: 21, column: 42 });
      const b = new Coord({ row: 20, column: 42 });

      expect(a).not.toBe(b);
      expect(a.equals(b)).toBe(false);
      expect(b.equals(a)).toBe(false);
    });
  });

  describe("isAdjacentTo method", () => {
    it("should return true on any of the four valid neighbouring coords", () => {
      const coord = new Coord({ row: 3, column: 1 });
      const neighbourTop = new Coord({ row: 2, column: 1 });
      const neighbourLeft = new Coord({ row: 3, column: 0 });
      const neighbourBot = new Coord({ row: 4, column: 1 });
      const neighbourRight = new Coord({ row: 3, column: 2 });

      expect(coord.isAdjacentTo(neighbourTop)).toBe(true);
      expect(coord.isAdjacentTo(neighbourLeft)).toBe(true);
      expect(coord.isAdjacentTo(neighbourBot)).toBe(true);
      expect(coord.isAdjacentTo(neighbourRight)).toBe(true);
    });

    it("should return false on any invalid neighbouring coords", () => {
      const coord = new Coord({ row: 3, column: 1 });

      expect(coord.isAdjacentTo(new Coord({ row: 3, column: 3 }))).toBe(false);
      expect(coord.isAdjacentTo(new Coord({ row: 2, column: 0 }))).toBe(false);
    });
  });

  describe("getNeighbours method", () => {
    it("should return an array of valid neighbour coords", () => {
      const coord = new Coord({ row: 3, column: 1 });

      expect(coord.getNeighbours()).toEqual(
        expect.arrayContaining([
          new Coord({ row: 2, column: 1 }),
          new Coord({ row: 3, column: 2 }),
          new Coord({ row: 4, column: 1 }),
          new Coord({ row: 3, column: 0 }),
        ]),
      );
    });

    it("should filter invalid coords from the list", () => {
      const coord = new Coord({ row: 0, column: 0 });

      expect(coord.getNeighbours()).toEqual(
        expect.arrayContaining([
          new Coord({ row: 0, column: 1 }),
          new Coord({ row: 1, column: 0 }),
        ]),
      );
    });
  });

  describe("toIndex method", () => {
    it("should return the index of the coord according to the metadata", () => {
      const coord = new Coord({ row: 1, column: 2 });

      expect(coord.toIndex({ width: 3, height: 3 })).toEqual(5);
      expect(coord.toIndex({ width: 6, height: 2 })).toEqual(8);
      expect(coord.toIndex({ width: 6, height: 24 })).toEqual(8);
    });

    it("should throw an error when metadata cannot host the coord", () => {
      const coord = new Coord({ row: 3, column: 5 });

      expect(() => coord.toIndex({ width: 2, height: 2 })).toThrow(CoordError);
    });
  });

  describe("fromIndex method", () => {
    it("should return the coord of the index according to the metadata", () => {
      expect(Coord.fromIndex(5, { width: 3, height: 3 })).toEqual(
        new Coord({ row: 1, column: 2 }),
      );
      expect(Coord.fromIndex(8, { width: 6, height: 2 })).toEqual(
        new Coord({ row: 1, column: 2 }),
      );
      expect(Coord.fromIndex(8, { width: 6, height: 24 })).toEqual(
        new Coord({ row: 1, column: 2 }),
      );
    });

    it("should throw an error when metadata cannot host the coord", () => {
      expect(() => Coord.fromIndex(42, { width: 2, height: 2 })).toThrow(
        CoordError,
      );
    });

    it("should throw an error when the index is < 0", () => {
      expect(() => Coord.fromIndex(-1, { width: 2, height: 2 })).toThrow(
        CoordError,
      );
    });
  });
});
