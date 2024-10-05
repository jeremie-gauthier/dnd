import { z } from "zod";
import { Playable } from "../../playable-entity.abstract";
import { Condition } from "./condition.abstract";

type Data = {
  readonly name: "doubleWeaponDamage";
  readonly applicableAt: "nextOutgoingWeaponAttack";
  remainingTurns: number;
};

export class DoubleWeaponDamage extends Condition {
  private static schema = z.object({
    name: z
      .literal("doubleWeaponDamage")
      .optional()
      .default("doubleWeaponDamage"),
    applicableAt: z
      .literal("nextOutgoingWeaponAttack")
      .optional()
      .default("nextOutgoingWeaponAttack"),
    remainingTurns: z.number().min(0),
  });

  constructor(rawData: Omit<Data, "name" | "applicableAt">) {
    const data = DoubleWeaponDamage.schema.parse(rawData);
    super(data);
  }

  public apply(_: { playableEntityAffected: Playable }) {
    this._data.remainingTurns -= 1;
  }

  public exhaustion(_: { playableEntityAffected: Playable }): void {
    return;
  }
}
