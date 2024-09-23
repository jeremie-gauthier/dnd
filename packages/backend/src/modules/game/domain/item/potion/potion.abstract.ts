import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Item } from "../item.abstract";

type Data = {
  readonly type: "Potion";
  readonly name: string;
  readonly level: number;
};

export abstract class Potion extends Item<Data> {
  constructor(data: Omit<Data, "type">) {
    super({ ...data, type: "Potion" });
  }

  public abstract use(_: {
    playableEntity: Playable;
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
