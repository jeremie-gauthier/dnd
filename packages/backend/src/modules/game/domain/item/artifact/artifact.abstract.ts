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
  constructor(data: Omit<Data, "type">) {
    super({ ...data, type: "Artifact" });
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
      hasSavingThrow: this._data.hasSavingThrow,
    };
  }
}
