import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";

type Data = {
  readonly userId: string;
};

export class GameMaster extends Entity<Data> {
  private static schema = z.object({
    userId: z.string(),
  });

  constructor(rawData: Data) {
    const data = GameMaster.schema.parse(rawData);
    super(data, data.userId);
  }

  public toPlain(): PlainData<Data> {
    return {
      userId: this._data.userId,
    };
  }
}
