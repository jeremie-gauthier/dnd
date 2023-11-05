import { describe, expect, it } from 'vitest';
import { Coord } from './coord';

describe('map: Coord', () => {
  describe('method: from', () => {
    it('should creates an instance with the `from` method', () => {
      const x = 21;
      const y = 42;

      const result = Coord.from({ x, y });
      const expected = new Coord(x, y);

      expect(result).toStrictEqual(expected);
    });
  });

  describe('method: equals', () => {
    it('should returns true when coords share the same x,y values', () => {
      const x = 21;
      const y = 42;
      const coordA = Coord.from({ x, y });
      const coordB = new Coord(x, y);

      const result = coordA.equals(coordB);
      const resultOppositeSide = coordB.equals(coordA);
      const expected = true;

      expect(result).toBe(expected);
      expect(resultOppositeSide).toBe(expected);
    });

    it("should returns false when coords don't share the same x,y values", () => {
      const coordA = Coord.from({ x: 21, y: 42 });
      const coordB = new Coord(32, 53);

      const result = coordA.equals(coordB);
      const resultOppositeSide = coordB.equals(coordA);
      const expected = false;

      expect(result).toBe(expected);
      expect(resultOppositeSide).toBe(expected);
    });
  });

  describe('method: isNextTo', () => {
    it('should returns true when coords are next to each other', () => {
      const x = 21;
      const y = 42;
      const coordA = Coord.from({ x, y });
      const coordB = new Coord(x + 1, y);

      const result = coordA.isNextTo(coordB);
      const resultOppositeSide = coordB.isNextTo(coordA);
      const expected = true;

      expect(result).toBe(expected);
      expect(resultOppositeSide).toBe(expected);
    });

    it('should returns false when coords are in diagonal to each other', () => {
      const x = 21;
      const y = 42;
      const coordA = Coord.from({ x, y });
      const coordB = new Coord(x + 1, y + 1);

      const result = coordA.isNextTo(coordB);
      const resultOppositeSide = coordB.isNextTo(coordA);
      const expected = false;

      expect(result).toBe(expected);
      expect(resultOppositeSide).toBe(expected);
    });

    it('should returns false when coords share the same x,y values', () => {
      const x = 21;
      const y = 42;
      const coordA = Coord.from({ x, y });
      const coordB = new Coord(x, y);

      const result = coordA.isNextTo(coordB);
      const resultOppositeSide = coordB.isNextTo(coordA);
      const expected = false;

      expect(result).toBe(expected);
      expect(resultOppositeSide).toBe(expected);
    });

    it('should returns false when coords are distant to each other', () => {
      const coordA = Coord.from({ x: 21, y: 42 });
      const coordB = new Coord(32, 53);

      const result = coordA.isNextTo(coordB);
      const resultOppositeSide = coordB.isNextTo(coordA);
      const expected = false;

      expect(result).toBe(expected);
      expect(resultOppositeSide).toBe(expected);
    });
  });

  describe('method: getNeighbourCoords', () => {
    it('should returns a tuple of 4 adjacent coords', () => {
      const coord = Coord.from({ x: 1, y: 1 });

      const result = coord.getNeighbourCoords();
      const expected = [
        Coord.from({ x: 0, y: 1 }),
        Coord.from({ x: 2, y: 1 }),
        Coord.from({ x: 1, y: 0 }),
        Coord.from({ x: 1, y: 2 }),
      ];

      expect(result).toStrictEqual(expected);
    });
  });
});
