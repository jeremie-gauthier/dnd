import { z } from "zod";
import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Item } from "../item.abstract";

type Data = {
  readonly type: "ChestTrap";
  readonly name: string;
  readonly level: number;
};

export abstract class ChestTrap extends Item<Data> {
  private static schema = z.object({
    type: z.literal("ChestTrap").optional().default("ChestTrap"),
    name: z.string(),
    level: z.number().min(0).max(3),
  });

  constructor(rawData: Omit<Data, "type">) {
    const data = ChestTrap.schema.parse(rawData);
    super(data);
  }

  public abstract use(_: {
    entityThatOpenedTheChest: Playable;
    board: Board;
  }): void;

  public toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
    };
  }
}
