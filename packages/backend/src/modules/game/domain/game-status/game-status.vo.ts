import { ValueObject } from "src/modules/shared/domain/value-object";
import {
  GameStatus as EGameStatus,
  GameStatusType,
} from "../../infra/database/enums/game-status.enum";
import { GameStatusError } from "./game-status.error";

type Data = GameStatusType;

export class GameStatus extends ValueObject<Data> {
  public get current() {
    return this._data;
  }

  public override equals(other: GameStatus): boolean {
    return this.current === other.current;
  }

  public next(): GameStatus {
    switch (this.current) {
      case EGameStatus.PREPARE_FOR_BATTLE:
        return new GameStatus(EGameStatus.BATTLE_ONGOING);
      case EGameStatus.BATTLE_ONGOING:
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
