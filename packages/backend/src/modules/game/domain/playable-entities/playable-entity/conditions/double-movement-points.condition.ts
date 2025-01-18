import { z } from "zod";
import { Playable } from "../playable-entity.abstract";
import { Condition } from "./condition.base";

type Data = {
  readonly name: "doubleMovementPoints";
  readonly playableEntityAffected: Playable;
  remainingTurns: number;
};

export class DoubleMovementPoints extends Condition {
  private static schema = Condition.baseSchema.merge(
    z.object({
      name: z
        .literal("doubleMovementPoints")
        .optional()
        .default("doubleMovementPoints"),
    }),
  );

  constructor(rawData: Omit<Data, "name">) {
    const data = DoubleMovementPoints.schema.parse(rawData);
    super(data);

    this._data.playableEntityAffected.addMovementPoints({
      amount: this._data.playableEntityAffected.baseMovementPoints,
    });
  }

  public override onEndOfTurn(): void {
    this.decrementRemainingTurns();
  }

  protected override onExhaustion(): void {
    this._data.playableEntityAffected.resetMovementPoints();
  }
}
