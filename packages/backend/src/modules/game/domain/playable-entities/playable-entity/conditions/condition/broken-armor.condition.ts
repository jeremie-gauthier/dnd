import { z } from "zod";
import { Playable } from "../../playable-entity.abstract";
import { Condition } from "./condition.abstract";

type Data = {
  readonly name: "brokenArmor";
  readonly applicableAt: "nextIncomingAttack";
  remainingTurns: number;
};

export class BrokenArmor extends Condition {
  private static schema = z.object({
    name: z.literal("brokenArmor").optional().default("brokenArmor"),
    applicableAt: z
      .literal("nextIncomingAttack")
      .optional()
      .default("nextIncomingAttack"),
    remainingTurns: z.number().min(0),
  });

  constructor(rawData: Omit<Data, "name" | "applicableAt">) {
    const data = BrokenArmor.schema.parse(rawData);
    super(data);
  }

  public apply({
    playableEntityAffected,
  }: { playableEntityAffected: Playable }) {
    playableEntityAffected.removeArmorClass();
    this._data.remainingTurns -= 1;
  }

  public exhaustion({
    playableEntityAffected,
  }: { playableEntityAffected: Playable }): void {
    playableEntityAffected.resetArmorClass();
  }
}
