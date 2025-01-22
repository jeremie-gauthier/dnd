import { AttackRangeType, AttackTypeType, sum } from "@dnd/shared";
import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Dice } from "../dice/dice.vo";
import { Perk } from "../perk/perk.abstract";

type Data = {
  readonly id: string;
  readonly range: AttackRangeType;
  readonly type: AttackTypeType;
  readonly dices: Array<Dice>;
  readonly perks: Array<Perk>;
};

export class Attack extends Entity<Data> {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    range: z.enum(["melee", "long", "versatile"]),
    type: z.enum(["regular", "super"]),
    dices: z.array(z.instanceof(Dice)).min(1),
    perks: z.array(z.instanceof(Perk)),
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

  public applyPerksToDicesResults(data: Parameters<Perk["apply"]>[0]) {
    const attackPerks = this._data.perks.filter((perk) =>
      perk.triggersOnSpecialDice(),
    );
    if (attackPerks.length === 0) {
      return;
    }

    const canApplySpecialDicePerks = data.dicesResults.dicesResults.some(
      ({ dice, result }) => dice.name === "special" && result === 1,
    );
    if (!canApplySpecialDicePerks) {
      return;
    }

    for (const attackPerk of attackPerks) {
      attackPerk.apply(data);
    }
  }

  public override toPlain() {
    return {
      id: this._data.id,
      range: this._data.range,
      type: this._data.type,
      dices: this._data.dices.map((dice) => dice.toPlain()),
      perks: this._data.perks.map((perk) => perk.toPlain()),
    };
  }
}
