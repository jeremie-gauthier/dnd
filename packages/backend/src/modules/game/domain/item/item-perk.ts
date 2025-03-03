import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Dice } from "../dice/dice.vo";
import { Perk } from "../perk/perk.abstract";

type Data = {
  readonly id: string;
  readonly perk: Perk;
  readonly dices: Array<Dice>;
};

export class ItemPerk extends Entity<Data> {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    perk: z.instanceof(Perk),
    dices: z.array(z.instanceof(Dice)),
  });

  constructor(rawData: Data) {
    const data = ItemPerk.schema.parse(rawData);
    super(data, data.id);
  }
  public override toPlain() {
    return {
      id: this._data.id,
      perk: this._data.perk.toPlain(),
      dices: this._data.dices.map((dice) => dice.toPlain()),
    };
  }
}
