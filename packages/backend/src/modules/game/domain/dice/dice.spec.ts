import { describe, expect, it, vi } from "vitest";
import { diceFactory } from "./dice.fixtures";
import { Dice } from "./dice.vo";

describe("Dice VO", () => {
  describe("constructor", () => {
    it("should create a new Dice when inputs are valid", () => {
      expect(diceFactory.createYellow()).toBeInstanceOf(Dice);
    });
  });

  describe("equals method", () => {
    it("should return true when values are equals", () => {
      const a = diceFactory.createYellow();
      const b = diceFactory.createYellow();

      expect(a).not.toBe(b);
      expect(a.equals(b)).toBe(true);
      expect(b.equals(a)).toBe(true);
    });

    it("should return false when values are not equals", () => {
      const a = diceFactory.createYellow();
      const b = diceFactory.createOrange();

      expect(a).not.toBe(b);
      expect(a.equals(b)).toBe(false);
      expect(b.equals(a)).toBe(false);
    });
  });

  describe("roll method", () => {
    it("should return true when values are equals", () => {
      vi.spyOn(Math, "random").mockReturnValueOnce(0.5);
      const dice = new Dice({ name: "test", values: [1, 2, 3, 4, 5, 6] });

      const result = dice.roll();

      expect(result).toEqual(4);
    });
  });
});
