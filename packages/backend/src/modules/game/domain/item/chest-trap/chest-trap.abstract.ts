import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Item } from "../item.abstract";

type Data = {
  readonly type: "ChestTrap";
  readonly name: string;
  readonly level: number;
};

export abstract class ChestTrap extends Item<Data> {
  constructor(data: Omit<Data, "type">) {
    super({ ...data, type: "ChestTrap" });
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
