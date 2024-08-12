import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { DoorOpeningEvent } from "./on-door-opening/door-opening-event.abstract";

type Data = {
  readonly name: "on_door_opening";
  readonly action: string;
  [key: string]: any;
};

export abstract class GameEvent<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  public abstract toPlain(): PlainData<ChildData>;

  public get name() {
    return this._data.name;
  }

  public get action() {
    return this._data.action;
  }

  public isDoorOpeningEvent(): this is DoorOpeningEvent {
    return this._data.name === "on_door_opening";
  }
}
