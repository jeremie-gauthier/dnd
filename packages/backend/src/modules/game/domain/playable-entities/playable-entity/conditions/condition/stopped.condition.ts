import { z } from "zod";
import { Playable } from "../../playable-entity.abstract";
import { Condition } from "./condition.abstract";

type Data = {
  readonly name: "stopped";
  readonly applicableAt: "startOfTurn";
  remainingTurns: number;
};

export class Stopped extends Condition {
  private static schema = z.object({
    name: z.literal("stopped").optional().default("stopped"),
    applicableAt: z.literal("startOfTurn").optional().default("startOfTurn"),
    remainingTurns: z.number().min(0),
  });

  constructor(rawData: Omit<Data, "name" | "applicableAt">) {
    const data = Stopped.schema.parse(rawData);
    super(data);
  }

  public apply({
    playableEntityAffected,
  }: { playableEntityAffected: Playable }) {
    playableEntityAffected.endTurn();
    this._data.remainingTurns -= 1;
  }
}
