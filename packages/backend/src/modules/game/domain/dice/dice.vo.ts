import { ValueObject } from "src/modules/shared/domain/value-object";
import { randomIndex } from "../services/random/random-index";
import { DiceError } from "./dice.error";

type D6 = [number, number, number, number, number, number];

type Data = {
  readonly name: string;
  readonly values: D6;
};

export class Dice extends ValueObject<Data> {
  public override equals(other: Dice): boolean {
    if (this._data.name !== other._data.name) {
      return false;
    }

    for (let i = 0; i < this._data.values.length; i += 1) {
      if (this._data.values[i] !== other._data.values[i]) {
        return false;
      }
    }
    return true;
  }

  public get name() {
    return this._data.name;
  }

  public get values() {
    return this._data.values;
  }

  public roll(): number {
    const randIndex = randomIndex(this._data.values.length);
    const result = this._data.values[randIndex];
    if (result === undefined) {
      throw new DiceError({
        name: "BAD_ROLL_DICE",
        message: "Fail to roll dice",
      });
    }
    return result;
  }

  public override toPlain() {
    return {
      name: this._data.name,
      values: this._data.values,
    };
  }
}
