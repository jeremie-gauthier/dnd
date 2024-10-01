import { AttackRange, AttackType } from "@dnd/shared";
import { z } from "zod";
import { Attack } from "../../attack/attack.entity";
import { Item } from "../item.abstract";
import { WeaponError } from "./weapon.error";

type Data = {
  readonly type: "Weapon";
  readonly name: string;
  readonly level: number;
  readonly attacks: Array<Attack>;
};

export class Weapon extends Item<Data> {
  private static schema = z.object({
    type: z.literal("Weapon").optional().default("Weapon"),
    name: z.string(),
    level: z.number().min(0).max(3),
    attacks: z.array(z.instanceof(Attack)),
  });

  constructor(rawData: Omit<Data, "type">) {
    const data = Weapon.schema.parse(rawData);
    super(data);
  }

  get type() {
    return this._data.type;
  }

  public hasAttack({ attackId }: { attackId: Attack["id"] }) {
    return this._data.attacks.some((attack) => attack.id === attackId);
  }

  public use({
    attackId,
  }: { attackId: Attack["id"] }): ReturnType<Attack["roll"]> {
    const attack = this.getAttackOrThrow({ attackId });
    return attack.roll();
  }

  public canAttackInMelee() {
    return this._data.attacks.find(
      (attack) =>
        (attack.type === AttackType.REGULAR &&
          attack.range === AttackRange.MELEE) ||
        attack.range === AttackRange.VERSATILE,
    );
  }

  public getRegularAttackOrThrow() {
    const regularAttack = this._data.attacks.find(
      (attack) => attack.type === AttackType.REGULAR,
    );
    if (!regularAttack) {
      throw new WeaponError({
        name: "ATTACK_NOT_FOUND",
        message: `Regular Attack not found on Weapon "${this._data.name}"`,
      });
    }
    return regularAttack;
  }

  public getAttackOrThrow({ attackId }: { attackId: Attack["id"] }) {
    const attack = this._data.attacks.find(({ id }) => id === attackId);
    if (!attack) {
      throw new WeaponError({
        name: "ATTACK_NOT_FOUND",
        message: "Attack does not exists on this Weapon",
      });
    }
    return attack;
  }

  public toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
      attacks: this._data.attacks.map((attack) => attack.toPlain()),
    };
  }
}
