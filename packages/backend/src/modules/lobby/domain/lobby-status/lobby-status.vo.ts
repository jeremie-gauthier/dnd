import { ValueObject } from "src/modules/shared/domain/value-object";
import { LobbyStatusError } from "./lobby-status.error";

type Data = "OPENED" | "GAME_INITIALIZING" | "GAME_STARTED";

export class LobbyStatus extends ValueObject<Data> {
  private static readonly STATE_MACHINE: Readonly<
    Record<Data, { advanceTo: Data[]; rollbackFrom: Data[] }>
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
    return this._data;
  }

  public override toPlain() {
    return this._data;
  }

  public override equals(other: LobbyStatus): boolean {
    return this._data === other._data;
  }

  public mustBeOpened() {
    if (this.current !== "OPENED") {
      throw new LobbyStatusError({
        name: "BAD_LOBBY_STATUS",
        message: `Expected lobby to be 'OPENED' (current: '${this.current}')`,
      });
    }
  }

  public advanceTo(status: Data): LobbyStatus {
    this.mustBeAbleToAdvanceTo({ status });
    return new LobbyStatus(status);
  }

  private mustBeAbleToAdvanceTo({ status }: { status: Data }) {
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
