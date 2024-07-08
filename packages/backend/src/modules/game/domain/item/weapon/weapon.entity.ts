import { z } from "zod";
import { Attack } from "../../attack/attack.entity";
import { Item } from "../item.abstract";

type Data = {
  readonly type: "Weapon";
  readonly name: string;
  readonly level: number;
  readonly attacks: Array<Attack>;
};

export class Weapon extends Item<Data> {
  private static schema = z.object({
    type: z.literal("Weapon"),
    name: z.string(),
    level: z.number().min(0).max(3),
    attacks: z.array(z.instanceof(Attack)),
  });

  constructor(rawData: Data) {
    const data = Weapon.schema.parse(rawData);
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
      throw new Error("Attack does not exists on this Weapon");
    }
    return attack;
  }

  public toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
      attacks: this._data.attacks.map((attack) => attack.toPlain()),
      perks: [],
    };
  }
}
