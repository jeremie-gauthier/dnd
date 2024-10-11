import { GameLog } from "@dnd/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LogPresenter {
  public async toView(gameLog: GameLog): Promise<GameLog> {
    return gameLog;
  }
}
