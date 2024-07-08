import { ItemManaCostJson } from "@dnd/shared";
import { z } from "zod";
import { Attack } from "../../attack/attack.entity";
import { Item } from "../item.abstract";

type Data = {
  readonly type: "Spell";
  readonly name: string;
  readonly level: number;
  readonly attacks: Array<Attack>;
  readonly manaCost: ItemManaCostJson;
};

export class Spell extends Item<Data> {
  private static schema = z.object({
    type: z.literal("Spell"),
    name: z.string(),
    level: z.number().min(0).max(3),
    attacks: z.array(z.instanceof(Attack)),
    manaCost: z.object({
      CLERIC: z.number().min(0).optional(),
      SORCERER: z.number().min(0).optional(),
    }),
  });

  constructor(rawData: Data) {
    const data = Spell.schema.parse(rawData);
    super(data);
  }

  public use({
    attackId,
  }: { attackId: Attack["id"] }): ReturnType<Attack["roll"]> {
    const attack = this.getAttackOrThrow({ attackId });
    return attack.roll();
  }

  private getAttackOrThrow({ attackId }: { attackId: Attack["id"] }) {
    const attack = this._data.attacks.find(({ id }) => id === attackId);
    if (!attack) {
      throw new Error("Attack does not exists on this Spell");
    }
    return attack;
  }

  public toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
      attacks: this._data.attacks.map((attack) => attack.toPlain()),
      manaCost: this._data.manaCost,
      perks: [],
    };
  }
}
