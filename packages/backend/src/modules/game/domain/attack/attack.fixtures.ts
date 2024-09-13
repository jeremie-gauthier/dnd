import { randomUUID } from "node:crypto";
import { diceFactory } from "../dice/dice.fixtures";
import { Attack } from "./attack.entity";

export const FAKE_ATTACK_ID = "00000000-0000-0000-0000-000000000000";

export const attackFactory = {
  createMeleeRegular() {
    return new Attack({
      id: randomUUID(),
      dices: [
        diceFactory.createYellow(),
        diceFactory.createYellow(),
        diceFactory.createOrange(),
      ],
      range: "melee",
      type: "regular",
      perks: [],
    });
  },
};
