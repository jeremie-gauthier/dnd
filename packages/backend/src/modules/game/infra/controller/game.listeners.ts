import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { HostRequestedGameStartPayload } from "src/modules/lobby/events/host-requested-game-start.payload";
import { LobbyDeletedPayload } from "src/modules/lobby/events/lobby-deleted.payload";
import { LobbyEvent } from "src/modules/lobby/events/lobby-event.enum";
import { DeleteGameUseCase } from "../../use-cases/delete-game/delete-game.uc";
import { GameInitializationUseCase } from "../../use-cases/game-initialization/game-initialization.uc";

@Injectable()
export class GameListeners {
  constructor(
    private readonly gameInitializationUseCase: GameInitializationUseCase,
    private readonly deleteGameUseCase: DeleteGameUseCase,
  ) {}

  @OnEvent(LobbyEvent.HostRequestedGameStart)
  public async gameInitialization(payload: HostRequestedGameStartPayload) {
    await this.gameInitializationUseCase.execute(payload);
  }

  @OnEvent(LobbyEvent.LobbyDeleted)
  public async deleteGame(payload: LobbyDeletedPayload) {
    await this.deleteGameUseCase.execute(payload);
  }
}
