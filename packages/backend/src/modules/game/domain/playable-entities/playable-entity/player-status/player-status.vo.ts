import { ValueObject } from "src/modules/shared/domain/value-object";
import { PlayerStatusError } from "./player-status.error";

type Data = "PREPARATION" | "IDLE" | "ACTION";

export class PlayerStatus extends ValueObject<Data> {
  private static STATE_MACHINE: Readonly<
    Record<
      Data,
      {
        advanceTo: Array<Data>;
        rollbackFrom: Array<Data>;
      }
    >
  > = {
    PREPARATION: {
      advanceTo: ["IDLE"],
      rollbackFrom: ["IDLE", "PREPARATION"],
    },
    IDLE: {
      advanceTo: ["ACTION"],
      rollbackFrom: [],
    },
    ACTION: {
      advanceTo: ["IDLE"],
      rollbackFrom: [],
    },
  };

  public override equals(other: PlayerStatus): boolean {
    return this._data === other._data;
  }

  public override toPlain() {
    return this._data;
  }

  public get current() {
    return this._data;
  }

  public advanceTo(status: Data): PlayerStatus {
    this.mustBeAbleToAdvanceTo(status);
    return new PlayerStatus(status);
  }

  private mustBeAbleToAdvanceTo(status: Data) {
    const canAdvanceTo =
      PlayerStatus.STATE_MACHINE[this.current].advanceTo.includes(status);
    if (!canAdvanceTo) {
      throw new PlayerStatusError({
        name: "ILLEGAL_STATUS_EDIT",
        message: `Player status cannot advance to '${status}' (current: '${this.current}')`,
      });
    }
  }
}
