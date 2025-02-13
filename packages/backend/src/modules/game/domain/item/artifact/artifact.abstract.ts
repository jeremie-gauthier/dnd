import { z } from "zod";
import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Item } from "../item.abstract";

type Data = {
  readonly type: "Artifact";
  readonly name: string;
  readonly level: number;
  readonly hasSavingThrow: boolean;
};

export abstract class Artifact extends Item<Data> {
  private static readonly schema = Item.baseSchema.merge(
    z.object({
      type: z.literal("Artifact").optional().default("Artifact"),
      hasSavingThrow: z.boolean(),
    }),
  );

  constructor(rawData: Omit<Data, "type">) {
    const data = Artifact.schema.parse(rawData);
    super(data);
  }

  public abstract use(_: {
    playableEntity: Playable;
    board: Board;
  }): void;

  public override toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
      hasSavingThrow: this._data.hasSavingThrow,
    };
  }
}
