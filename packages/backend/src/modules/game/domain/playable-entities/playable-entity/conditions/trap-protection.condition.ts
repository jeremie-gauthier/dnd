import { z } from "zod";
import { Playable } from "../playable-entity.abstract";
import { Condition } from "./condition.base";

type Data = {
  readonly name: "trapProtection";
  remainingTurns: number;
  playableEntityAffected: Playable;
};

export class TrapProtection extends Condition {
  private static schema = Condition.baseSchema.merge(
    z.object({
      name: z.literal("trapProtection").optional().default("trapProtection"),
    }),
  );

  constructor(rawData: Omit<Data, "name">) {
    const data = TrapProtection.schema.parse(rawData);
    super(data);
  }

  public override onBeforeTrapOrChestTrapTriggered(): void {
    this.decrementRemainingTurns();
  }
}
