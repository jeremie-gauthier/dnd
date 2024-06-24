import { ValueObject } from "src/modules/shared/domain/value-object";
import { DiceError } from "./dice.error";

type D6 = [number, number, number, number, number, number];

type Data = {
  readonly values: D6;
};

export class Dice extends ValueObject<Data> {
  public equals(other: Dice): boolean {
    for (let i = 0; i < this._data.values.length; i += 1) {
      if (this._data.values[i] !== other._data.values[i]) {
        return false;
      }
    }
    return true;
  }

  public roll(): number {
    const randIndex = Math.trunc(Math.random() * this._data.values.length);
    const result = this._data.values[randIndex];
    if (!result) {
      throw new DiceError({
        name: "BAD_ROLL_DICE",
        message: "Fail to roll dice",
      });
    }
    return result;
  }
}
