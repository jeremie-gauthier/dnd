import { z } from "zod";
import { Playable } from "../../playable-entity.abstract";
import { Condition } from "./condition.abstract";

type Data = {
  readonly name: "trapProtection";
  readonly applicableAt: "nextTrapOrChestTrap";
  remainingTurns: number;
};

export class TrapProtection extends Condition {
  private static schema = z.object({
    name: z.literal("trapProtection").optional().default("trapProtection"),
    applicableAt: z
      .literal("nextTrapOrChestTrap")
      .optional()
      .default("nextTrapOrChestTrap"),
    remainingTurns: z.number().min(0),
  });

  constructor(rawData: Omit<Data, "name" | "applicableAt">) {
    const data = TrapProtection.schema.parse(rawData);
    super(data);
  }

  public apply(_: { playableEntityAffected: Playable }) {
    this._data.remainingTurns -= 1;
  }

  public exhaustion(_: { playableEntityAffected: Playable }): void {
    return;
  }
}
