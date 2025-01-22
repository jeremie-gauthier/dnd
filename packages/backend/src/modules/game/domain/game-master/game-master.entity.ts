import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";

type Data = {
  readonly userId: string;
};

export class GameMaster extends Entity<Data> {
  private static readonly schema = z.object({
    userId: z.string(),
  });

  constructor(rawData: Data) {
    const data = GameMaster.schema.parse(rawData);
    super(data, data.userId);
  }

  public override toPlain(): PlainData<Data> {
    return {
      userId: this._data.userId,
    };
  }
}
