import { Dice } from "./dice.vo";

export const diceFactory = {
  createYellow() {
    return new Dice({
      name: "yellow",
      values: [0, 0, 1, 1, 1, 1],
    });
  },
  createOrange() {
    return new Dice({
      name: "orange",
      values: [1, 1, 1, 1, 2, 2],
    });
  },
  createRed() {
    return new Dice({
      name: "red",
      values: [0, 0, 1, 2, 2, 3],
    });
  },
  createSpecial() {
    return new Dice({
      name: "special",
      values: [0, 0, 0, 1, 1, 1],
    });
  },
};
