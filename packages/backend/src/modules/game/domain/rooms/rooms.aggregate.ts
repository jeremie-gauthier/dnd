import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../coord/coord.vo";
import { Room } from "./room/room.entity";
import { RoomError } from "./room/room.error";

type Data = {
  values: Array<Room>;
};

export class Rooms extends Entity<Data> {
  private static schema = z.object({
    values: z.array(z.instanceof(Room)).min(1),
  });

  constructor(rawData: Data) {
    const data = Rooms.schema.parse(rawData);
    super(data);
  }

  public getRoomOrThrow({ coord }: { coord: Coord }) {
    const room = this._data.values.find((room) => room.contains({ coord }));
    if (!room) {
      throw new RoomError({
        name: "ROOM_NOT_FOUND",
        message: `No room found at coord ${coord}`,
      });
    }
    return room;
  }

  public override toPlain(): PlainData<Data> {
    return {
      values: this._data.values.map((room) => room.toPlain()),
    };
  }
}
