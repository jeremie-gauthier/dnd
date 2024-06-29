import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Playable } from "../playable-entity/playable-entity.abstract";

type Data = {
  playableEntities: Array<Playable["id"]>;
};

export class Timeline extends Entity<Data> {
  private static schema = z.object({
    playableEntities: z.array(z.string()).min(4),
  });

  constructor(rawData: Data) {
    const data = Timeline.schema.parse(rawData);
    super(data);
  }

  public toPlain() {
    return {
      playableEntities: this._data.playableEntities,
    };
  }
}
