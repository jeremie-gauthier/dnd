import { PlayableEntityRaceType } from "src/modules/game/infra/database/enums/playable-entity-race.enum";
import { z } from "zod";
import { Coord } from "../../../coord/coord.vo";
import { Room } from "../../../rooms/room/room.entity";
import { DoorOpeningEvent } from "./door-opening-event.abstract";

type Data = {
  readonly name: "on_door_opening";
  readonly action: "spawn_monsters";
  readonly data: {
    readonly doorCoord: Coord;
    readonly monsters: Array<PlayableEntityRaceType>;
    readonly startingRooms: Array<Room["id"]>;
  };
};

export class OnDoorOpeningSpawnMonsters extends DoorOpeningEvent<Data> {
  private static readonly schema = z.object({
    name: z.literal("on_door_opening").optional().default("on_door_opening"),
    action: z.literal("spawn_monsters").optional().default("spawn_monsters"),
    data: z.object({
      doorCoord: z.instanceof(Coord),
      monsters: z.array(z.enum(["goblin", "bugbear"])),
      startingRooms: z.array(z.string().uuid()),
    }),
  });

  constructor(rawData: Omit<Data, "name" | "action">) {
    const data = OnDoorOpeningSpawnMonsters.schema.parse(rawData);
    super(data);
  }

  public get monsters() {
    return this._data.data.monsters;
  }

  public get startingRooms() {
    return this._data.data.startingRooms;
  }

  public override toPlain() {
    return {
      name: this._data.name,
      action: this._data.action,
      data: {
        doorCoord: this._data.data.doorCoord.toPlain() as any,
        monsters: this._data.data.monsters as any,
        startingRooms: this._data.data.startingRooms,
      },
    };
  }
}
