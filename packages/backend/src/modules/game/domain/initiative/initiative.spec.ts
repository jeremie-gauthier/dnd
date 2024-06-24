import { describe, expect, it, vi } from "vitest";
import { Initiative } from "./initiative.vo";

describe("Initiative VO", () => {
  describe("constructor", () => {
    it("should create a new Initiative when inputs are valid", () => {
      expect(new Initiative({ initiative: 42 })).toBeInstanceOf(Initiative);
    });
  });

  describe("equals method", () => {
    it("should return true when values are equals", () => {
      const a = new Initiative({ initiative: 42 });
      const b = new Initiative({ initiative: 42 });

      expect(a).not.toBe(b);
      expect(a.equals(b)).toBe(true);
      expect(b.equals(a)).toBe(true);
    });

    it("should return false when values are not equals", () => {
      const a = new Initiative({ initiative: 42 });
      const b = new Initiative({ initiative: 21 });

      expect(a).not.toBe(b);
      expect(a.equals(b)).toBe(false);
      expect(b.equals(a)).toBe(false);
    });
  });

  describe("roll method", () => {
    it("should return true when values are equals", () => {
      vi.spyOn(Math, "random").mockReturnValueOnce(0.86);
      const initiative = new Initiative({ initiative: Number.NaN });

      const result = initiative.roll();

      expect(result).toEqual(86);
    });
  });
});
