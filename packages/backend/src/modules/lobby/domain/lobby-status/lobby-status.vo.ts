import { ValueObject } from "src/modules/shared/domain/value-object";
import { LobbyStatusError } from "./lobby-status.error";

type Data = {
  status: "OPENED" | "GAME_INITIALIZING" | "GAME_STARTED";
};

export class LobbyStatus extends ValueObject<Data> {
  private static STATE_MACHINE: Readonly<
    Record<
      Data["status"],
      { advanceTo: Data["status"][]; rollbackFrom: Data["status"][] }
    >
  > = {
    OPENED: {
      advanceTo: ["GAME_INITIALIZING"],
      rollbackFrom: ["GAME_INITIALIZING"],
    },
    GAME_INITIALIZING: {
      advanceTo: ["GAME_STARTED"],
      rollbackFrom: [],
    },
    GAME_STARTED: {
      advanceTo: [],
      rollbackFrom: [],
    },
  };

  public get current() {
    return this._data.status;
  }

  public equals(other: LobbyStatus): boolean {
    return this._data.status === other._data.status;
  }

  public mustBeOpened() {
    if (this.current !== "OPENED") {
      throw new LobbyStatusError({
        name: "BAD_LOBBY_STATUS",
        message: `Expected lobby to be 'OPENED' (current: '${this.current}')`,
      });
    }
  }

  public advanceTo({ status }: { status: Data["status"] }): LobbyStatus {
    this.mustBeAbleToAdvanceTo({ status });
    return new LobbyStatus({ status });
  }

  private mustBeAbleToAdvanceTo({ status }: { status: Data["status"] }) {
    const canAdvanceTo =
      LobbyStatus.STATE_MACHINE[this.current].advanceTo.includes(status);
    if (!canAdvanceTo) {
      throw new LobbyStatusError({
        name: "ILLEGAL_STATUS_EDIT",
        message: `Lobby status cannot advance to '${status}' (current: '${this.current}')`,
      });
    }
  }
}
