import { z } from "zod";
import { Playable } from "../../playable-entity.abstract";
import { Condition } from "./condition.abstract";

type Data = {
  readonly name: "weakness";
  readonly applicableAt: "startOfTurn";
  remainingTurns: number;
};

export class Weakness extends Condition {
  private static schema = z.object({
    name: z.literal("weakness").optional().default("weakness"),
    applicableAt: z.literal("startOfTurn").optional().default("startOfTurn"),
    remainingTurns: z.number().min(0),
  });

  constructor(rawData: Omit<Data, "name" | "applicableAt">) {
    const data = Weakness.schema.parse(rawData);
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
