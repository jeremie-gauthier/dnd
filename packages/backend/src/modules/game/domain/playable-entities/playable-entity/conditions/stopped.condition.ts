import { z } from "zod";
import { Playable } from "../playable-entity.abstract";
import { Condition } from "./condition.entity";

type Data = {
  readonly name: "stopped";
  remainingTurns: number;
  playableEntityAffected: Playable;
};

export class Stopped extends Condition {
  private static schema = Condition.baseSchema.merge(
    z.object({
      name: z.literal("stopped").optional().default("stopped"),
    }),
  );

  constructor(rawData: Omit<Data, "name">) {
    const data = Stopped.schema.parse(rawData);
    super(data);
  }

  public override onStartOfTurn(): void {
    this._data.playableEntityAffected.endTurn();
    this.decrementRemainingTurns();
  }
}
