import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../../../coord/coord.vo";

type Data = {
  topLeft: Coord;
  bottomRight: Coord;
};

export class BoundingBox extends Entity<Data> {
  private static schema = z.object({
    topLeft: z.instanceof(Coord),
    bottomRight: z.instanceof(Coord),
  });

  constructor(rawData: Data) {
    const data = BoundingBox.schema.parse(rawData);
    super(data);
  }

  public toPlain(): PlainData<Data> {
    return {
      topLeft: this._data.topLeft.toPlain(),
      bottomRight: this._data.bottomRight.toPlain(),
    };
  }
}
