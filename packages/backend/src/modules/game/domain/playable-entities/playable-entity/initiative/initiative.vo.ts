import { ValueObject } from "src/modules/shared/domain/value-object";
import { InitiativeError } from "./initiative.error";

type Data = number;

export class Initiative extends ValueObject<Data> {
  constructor(data: Data) {
    if (data < 0) {
      throw new InitiativeError({
        name: "NEGATIVE_INITIATIVE",
        message: "Invalid initiative score (negative)",
      });
    }
    super(data);
  }

  get value() {
    return this._data;
  }

  public override equals(other: Initiative): boolean {
    return this._data === other._data;
  }

  public compare(other: Initiative): number {
    return this._data - other._data;
  }

  public override toPlain() {
    return this._data;
  }
}
