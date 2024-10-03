import { z } from "zod";
import { Playable } from "../../playable-entity.abstract";
import { Condition } from "./condition.abstract";

type Data = {
  readonly name: "doubleMovementPoints";
  readonly applicableAt: "endOfTurn";
  remainingTurns: number;
};

export class DoubleMovementPoints extends Condition {
  private static schema = z.object({
    name: z
      .literal("doubleMovementPoints")
      .optional()
      .default("doubleMovementPoints"),
    applicableAt: z.literal("endOfTurn").optional().default("endOfTurn"),
    remainingTurns: z.number().min(0),
  });

  constructor(rawData: Omit<Data, "name" | "applicableAt">) {
    const data = DoubleMovementPoints.schema.parse(rawData);
    super(data);
  }

  public apply({
    playableEntityAffected,
  }: { playableEntityAffected: Playable }) {
    playableEntityAffected.addMovementPoints({
      amount: playableEntityAffected.baseMovementPoints,
    });
    this._data.remainingTurns -= 1;
  }

  public exhaustion({
    playableEntityAffected,
  }: { playableEntityAffected: Playable }): void {
    playableEntityAffected.resetMovementPoints();
  }
}
