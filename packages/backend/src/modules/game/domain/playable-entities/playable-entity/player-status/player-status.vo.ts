import { ValueObject } from "src/modules/shared/domain/value-object";
import {
  CurrentPhase,
  CurrentPhaseType,
} from "../../../../infra/database/enums/current-phase.enum";
import { PlayerStatusError } from "./player-status.error";

type Data = CurrentPhaseType;

export class PlayerStatus extends ValueObject<Data> {
  private static readonly STATE_MACHINE: Readonly<
    Record<
      Data,
      {
        advanceTo: Array<Data>;
        rollbackFrom: Array<Data>;
      }
    >
  > = {
    [CurrentPhase.PREPARATION]: {
      advanceTo: [CurrentPhase.IDLE],
      rollbackFrom: [CurrentPhase.IDLE, CurrentPhase.PREPARATION],
    },
    [CurrentPhase.IDLE]: {
      advanceTo: [CurrentPhase.ACTION],
      rollbackFrom: [],
    },
    [CurrentPhase.ACTION]: {
      advanceTo: [CurrentPhase.IDLE],
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
