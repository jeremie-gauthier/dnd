import { ValueObject } from "src/modules/shared/domain/value-object";
import { GameStatusError } from "./game-status.error";

type Data = "PREPARE_FOR_BATTLE" | "BATTLE_ONGOING";

export class GameStatus extends ValueObject<Data> {
  private static STATE_MACHINE: Readonly<
    Record<Data, { advanceTo: Array<Data>; rollbackFrom: Array<Data> }>
  > = {
    PREPARE_FOR_BATTLE: {
      advanceTo: ["BATTLE_ONGOING"],
      rollbackFrom: [],
    },
    BATTLE_ONGOING: {
      advanceTo: [],
      rollbackFrom: [],
    },
  };

  public get current() {
    return this._data;
  }

  public override equals(other: GameStatus): boolean {
    return this.current === other.current;
  }

  public next(): GameStatus {
    switch (this.current) {
      case "PREPARE_FOR_BATTLE":
        return new GameStatus("BATTLE_ONGOING");
      case "BATTLE_ONGOING":
        throw new GameStatusError({
          name: "ILLEGAL_STATUS_EDIT",
          message: `Game status cannot advance further than '${this.current}'`,
        });
    }
  }

  public override toPlain() {
    return this._data;
  }
}
