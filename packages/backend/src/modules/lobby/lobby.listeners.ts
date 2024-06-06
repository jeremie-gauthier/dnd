import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GameEvent } from "../game/events/game-event.enum";
import { GameInitializationDonePayload } from "../game/events/game-initialization-done.payload";
import { GameInitializationDoneUseCase } from "./game-initialization-done/game-initialization-done.uc";

@Injectable()
export class LobbyListeners {
  constructor(
    private readonly gameInitializationDoneUseCase: GameInitializationDoneUseCase,
  ) {}

  @OnEvent(GameEvent.GameInitializationDone)
  public async gameInitializationDone(payload: GameInitializationDonePayload) {
    await this.gameInitializationDoneUseCase.execute(payload);
  }
}
