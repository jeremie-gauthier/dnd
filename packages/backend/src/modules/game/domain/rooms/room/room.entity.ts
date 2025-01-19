import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../../coord/coord.vo";
import { BoundingBox } from "./bounding-box/bounding-box.entity";

type Data = {
  id: string;
  hasBeenVisited: boolean;
  boundingBoxes: Array<BoundingBox>;
};

export class Room extends Entity<Data> {
  private static schema = z.object({
    id: z.string(),
    hasBeenVisited: z.boolean(),
    boundingBoxes: z.array(z.instanceof(BoundingBox)).min(1),
  });

  constructor(rawData: Data) {
    const data = Room.schema.parse(rawData);
    super(data, data.id);
  }

  public getContainedCoords() {
    return this._data.boundingBoxes.flatMap((boundingBox) =>
      boundingBox.getContainedCoords(),
    );
  }

  public contains({ coord }: { coord: Coord }) {
    return this._data.boundingBoxes.some((boundingBox) =>
      boundingBox.contains({ coord }),
    );
  }

  public override toPlain(): PlainData<Data> {
    return {
      id: this._data.id,
      hasBeenVisited: this._data.hasBeenVisited,
      boundingBoxes: this._data.boundingBoxes.map((boundingBox) =>
        boundingBox.toPlain(),
      ),
    };
  }
}
