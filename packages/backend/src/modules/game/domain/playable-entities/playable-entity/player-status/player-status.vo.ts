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

  public equals(other: PlayerStatus): boolean {
    return this._data === other._data;
  }

  public toPlain() {
    return this._data;
  }

  public get current() {
    return this._data;
  }

  public advanceTo({ currentPhase }: { currentPhase: Data }): PlayerStatus {
    this.mustBeAbleToAdvanceTo({ currentPhase });
    return new PlayerStatus(currentPhase);
  }

  private mustBeAbleToAdvanceTo({ currentPhase }: { currentPhase: Data }) {
    const canAdvanceTo =
      PlayerStatus.STATE_MACHINE[this.current].advanceTo.includes(currentPhase);
    if (!canAdvanceTo) {
      throw new PlayerStatusError({
        name: "ILLEGAL_STATUS_EDIT",
        message: `Player status cannot advance to '${currentPhase}' (current: '${this.current}')`,
      });
    }
  }
}
