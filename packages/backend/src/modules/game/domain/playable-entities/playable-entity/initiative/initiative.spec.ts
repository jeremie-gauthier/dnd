import { describe, expect, it, vi } from "vitest";
import { Initiative } from "./initiative.vo";

describe("Initiative VO", () => {
  describe("constructor", () => {
    it("should create a new Initiative when inputs are valid", () => {
      expect(new Initiative(42)).toBeInstanceOf(Initiative);
    });
  });

  describe("equals method", () => {
    it("should return true when values are equals", () => {
      const a = new Initiative(42);
      const b = new Initiative(42);

      expect(a).not.toBe(b);
      expect(a.equals(b)).toBe(true);
      expect(b.equals(a)).toBe(true);
    });

    it("should return false when values are not equals", () => {
      const a = new Initiative(42);
      const b = new Initiative(21);

      expect(a).not.toBe(b);
      expect(a.equals(b)).toBe(false);
      expect(b.equals(a)).toBe(false);
    });
  });

  describe("roll method", () => {
    it("should return true when values are equals", () => {
      vi.spyOn(Math, "random").mockReturnValueOnce(0.86);
      const initiative = new Initiative(Number.NaN);

      const result = initiative.roll();

      expect(result.equals(new Initiative(86))).toBe(true);
    });
  });

  describe("compare method", () => {
    it("should compare values", () => {
      const alpha = new Initiative(50);
      const beta = new Initiative(8);

      expect(alpha.compare(beta)).toEqual(42);
      expect(beta.compare(alpha)).toEqual(-42);
    });
  });
});
