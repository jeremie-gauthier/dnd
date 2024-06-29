import { ValueObject } from "src/modules/shared/domain/value-object";
import { PlayerStatusError } from "./player-status.error";

type Data = {
  currentPhase: "PREPARATION" | "IDLE" | "ACTION";
};

export class PlayerStatus extends ValueObject<Data> {
  private static STATE_MACHINE: Readonly<
    Record<
      Data["currentPhase"],
      {
        advanceTo: Data["currentPhase"][];
        rollbackFrom: Data["currentPhase"][];
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
    return this._data.currentPhase === other._data.currentPhase;
  }

  public toPlain() {
    return {
      currentPhase: this._data.currentPhase,
    };
  }

  public get current() {
    return this._data.currentPhase;
  }

  public advanceTo({
    currentPhase,
  }: { currentPhase: Data["currentPhase"] }): PlayerStatus {
    this.mustBeAbleToAdvanceTo({ currentPhase });
    return new PlayerStatus({ currentPhase });
  }

  private mustBeAbleToAdvanceTo({
    currentPhase,
  }: { currentPhase: Data["currentPhase"] }) {
    const canAdvanceTo =
      PlayerStatus.STATE_MACHINE[this.current].advanceTo.includes(currentPhase);
    if (!canAdvanceTo) {
      throw new PlayerStatusError({
        name: "ILLEGAL_STATUS_EDIT",
        message: `Lobby status cannot advance to '${currentPhase}' (current: '${this.current}')`,
      });
    }
  }
}
