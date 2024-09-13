import { AttackRangeType, AttackTypeType, sum } from "@dnd/shared";
import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Dice } from "../dice/dice.vo";

type Data = {
  readonly id: string;
  readonly range: AttackRangeType;
  readonly type: AttackTypeType;
  readonly dices: Array<Dice>;
};

export class Attack extends Entity<Data> {
  private static schema = z.object({
    id: z.string().uuid(),
    range: z.enum(["melee", "long", "versatile"]),
    type: z.enum(["regular", "super"]),
    dices: z.array(z.instanceof(Dice)).min(1),
  });

  constructor(rawData: Data) {
    const data = Attack.schema.parse(rawData);
    super(data, data.id);
  }

  public get range() {
    return this._data.range;
  }

  public get type() {
    return this._data.type;
  }

  public roll() {
    const dicesResults = this._data.dices.map((dice) => ({
      dice,
      result: dice.roll(),
    }));
    return {
      dicesResults,
      sumResult: sum(
        ...dicesResults
          .filter(({ dice }) => dice.name !== "special")
          .map(({ result }) => result),
      ),
    };
  }

  public toPlain() {
    return {
      id: this._data.id,
      range: this._data.range,
      type: this._data.type,
      dices: this._data.dices.map((dice) => dice.toPlain()),
    };
  }
}
