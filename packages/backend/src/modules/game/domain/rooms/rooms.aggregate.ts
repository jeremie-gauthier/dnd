import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Room } from "./room/room.entity";

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

  public toPlain(): PlainData<Data> {
    return {
      values: this._data.values.map((room) => room.toPlain()),
    };
  }
}
