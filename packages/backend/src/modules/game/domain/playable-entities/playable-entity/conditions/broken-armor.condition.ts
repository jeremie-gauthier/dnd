import { z } from "zod";
import { Playable } from "../playable-entity.abstract";
import { Condition } from "./condition.entity";

type Data = {
  readonly name: "brokenArmor";
  readonly playableEntityAffected: Playable;
  remainingTurns: number;
};

export class BrokenArmor extends Condition {
  private static schema = Condition.baseSchema.merge(
    z.object({
      name: z.literal("brokenArmor").optional().default("brokenArmor"),
    }),
  );

  constructor(rawData: Omit<Data, "name">) {
    const data = BrokenArmor.schema.parse(rawData);
    super(data);
  }

  public override onBeforeIncomingAttack(): void {
    this._data.playableEntityAffected.removeArmorClass();
    this.decrementRemainingTurns();
  }

  protected override onExhaustion(): void {
    this._data.playableEntityAffected.resetArmorClass();
  }
}
