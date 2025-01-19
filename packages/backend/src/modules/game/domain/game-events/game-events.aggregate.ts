import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { Coord } from "../coord/coord.vo";
import { GameEvent } from "./game-event/game-event.abstract";
import { DoorOpeningEvent } from "./game-event/on-door-opening/door-opening-event.abstract";

type Data = {
  values: Array<GameEvent>;
};

export class GameEvents extends Entity<Data> {
  public getRelatedDoorOpeningEvents({ doorCoord }: { doorCoord: Coord }) {
    return this._data.values.filter(
      (event): event is DoorOpeningEvent =>
        event.isDoorOpeningEvent() && event.doorCoord.equals(doorCoord),
    );
  }

  public override toPlain(): PlainData<Data> {
    return {
      values: this._data.values.map((gameEvent) => gameEvent.toPlain()),
    };
  }
}
