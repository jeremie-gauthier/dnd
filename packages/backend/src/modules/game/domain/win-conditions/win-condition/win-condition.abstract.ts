import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { WinConditionEvent } from "../win-conditions.event";

type Data = {
  readonly name: "defeat_all_monsters";
};

export abstract class WinCondition<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  public abstract get isAccomplished(): boolean;
  public abstract toPlain(): PlainData<ChildData>;
  public abstract updateProgression(_: { eventName: WinConditionEvent }): void;

  constructor(rawData: ChildData) {
    super(rawData, rawData.name);
  }
}
