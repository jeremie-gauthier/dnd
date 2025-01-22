import { z } from "zod";
import { Playable } from "../playable-entity.abstract";
import { Condition } from "./condition.entity";

type Data = {
  readonly name: "weakness";
  remainingTurns: number;
  playableEntityAffected: Playable;
};

export class Weakness extends Condition {
  private static readonly schema = Condition.baseSchema.merge(
    z.object({
      name: z.literal("weakness").optional().default("weakness"),
    }),
  );

  constructor(rawData: Omit<Data, "name">) {
    const data = Weakness.schema.parse(rawData);
    super(data);

    this._data.playableEntityAffected.removeArmorClass();
    this.decrementRemainingTurns();
  }

  public override onStartOfTurn(): void {
    this.decrementRemainingTurns();
  }

  protected override onExhaustion(): void {
    this._data.playableEntityAffected.resetArmorClass();
  }
}
