import { z } from "zod";
import { Playable } from "../playable-entity.abstract";
import { Condition } from "./condition.base";

type Data = {
  readonly name: "doubleWeaponDamage";
  remainingTurns: number;
  playableEntityAffected: Playable;
};

export class DoubleWeaponDamage extends Condition {
  private static schema = Condition.baseSchema.merge(
    z.object({
      name: z
        .literal("doubleWeaponDamage")
        .optional()
        .default("doubleWeaponDamage"),
    }),
  );

  constructor(rawData: Omit<Data, "name">) {
    const data = DoubleWeaponDamage.schema.parse(rawData);
    super(data);
  }

  public override onBeforeOutgoingWeaponAttack({
    sumResult,
  }: { sumResult: number }): void {
    sumResult *= 2;
    this.decrementRemainingTurns();
  }
}
