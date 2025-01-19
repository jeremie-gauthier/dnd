import { PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { WinConditionEvent } from "../win-conditions.event";
import { WinCondition } from "./win-condition.abstract";

type Data = {
  readonly name: "defeat_all_monsters";
  nbMonstersRemaining: number;
};

export class DefeatAllMonsters extends WinCondition<Data> {
  private static schema = z.object({
    name: z.literal("defeat_all_monsters").default("defeat_all_monsters"),
    nbMonstersRemaining: z.number().min(0),
    isAccomplished: z.boolean().default(false),
  });

  constructor(rawData: Omit<Data, "name">) {
    const data = DefeatAllMonsters.schema.parse(rawData);
    super(data);
  }

  public override toPlain(): PlainData<Data> {
    return {
      name: "defeat_all_monsters",
      nbMonstersRemaining: this._data.nbMonstersRemaining,
    };
  }

  public override get isAccomplished(): boolean {
    return this._data.nbMonstersRemaining <= 0;
  }

  public override updateProgression({
    eventName,
  }: { eventName: WinConditionEvent }): void {
    if (this.isAccomplished) {
      return;
    }

    if (eventName === "enemy_died") {
      this._data.nbMonstersRemaining -= 1;
    } else if (eventName === "enemy_resurrected") {
      this._data.nbMonstersRemaining += 1;
    }
  }
}
