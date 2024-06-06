import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { HostRequestedGameStartPayload } from "src/modules/lobby/events/host-requested-game-start.payload";
import { LobbyEvent } from "src/modules/lobby/events/lobby-event.enum";
import { GameInitializationUseCase } from "./game-initialization/game-initialization.uc";

@Injectable()
export class GameListeners {
  constructor(
    private readonly gameInitializationUseCase: GameInitializationUseCase,
  ) {}

  @OnEvent(LobbyEvent.HostRequestedGameStart)
  public async gameInitialization(payload: HostRequestedGameStartPayload) {
    await this.gameInitializationUseCase.execute(payload);
  }
}
