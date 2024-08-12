import { describe, expect, it, vi } from "vitest";
import { Dice } from "../dice/dice.vo";
import { Attack } from "./attack.entity";
import { FAKE_ATTACK_ID } from "./attack.fixtures";

describe("Attack Entity", () => {
  describe("roll method", () => {
    it("should roll all the dices", () => {
      vi.spyOn(Math, "random")
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0.9)
        .mockReturnValueOnce(0.2);

      const alphaDice = new Dice({ name: "alpha", values: [2, 0, 0, 0, 1, 4] });
      const betaDice = new Dice({ name: "beta", values: [1, 5, 6, 7, 8, 0] });
      const attack = new Attack({
        id: FAKE_ATTACK_ID,
        dices: [alphaDice, alphaDice, betaDice],
        range: "versatile",
        type: "regular",
      });

      const result = attack.roll();

      expect(result).toStrictEqual({
        dicesResults: [
          { dice: alphaDice, result: 2 },
          { dice: alphaDice, result: 4 },
          { dice: betaDice, result: 5 },
        ],
        sumResult: 11,
      });
    });
  });
});
