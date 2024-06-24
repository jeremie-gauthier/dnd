import { ValueObject } from "src/modules/shared/domain/value-object";
import { InitiativeError } from "./initiative.error";

type Data = {
  initiative: number;
};

export class Initiative extends ValueObject<Data> {
  constructor(data: Data) {
    if (data.initiative < 0) {
      throw new InitiativeError({
        name: "NEGATIVE_INITIATIVE",
        message: "Invalid initiative score (negative)",
      });
    }
    super(data);
  }

  public equals(other: Initiative): boolean {
    return this._data.initiative === other._data.initiative;
  }

  public roll(): number {
    return Math.round(Math.random() * 100);
  }
}
