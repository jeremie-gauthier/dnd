import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CampaignEvent } from "src/modules/campaign/events/campaign-event.enum";
import { GameInitializationDonePayload } from "src/modules/campaign/events/game-initialization-done.payload";
import { LobbyDeletedPayload } from "src/modules/shared/events/lobby/lobby-deleted.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { DeleteGameUseCase } from "./use-cases/delete-game/delete-game.uc";
import { GameInitializationUseCase } from "./use-cases/game-initialization/game-initialization.uc";

@Injectable()
export class GameListeners {
  constructor(
    private readonly gameInitializationUseCase: GameInitializationUseCase,
    private readonly deleteGameUseCase: DeleteGameUseCase,
  ) {}

  @OnEvent(CampaignEvent.GameInitializationDone)
  public async gameInitialization(payload: GameInitializationDonePayload) {
    await this.gameInitializationUseCase.execute(payload);
  }

  @OnEvent(LobbyEvent.LobbyDeleted)
  public async deleteGame(payload: LobbyDeletedPayload) {
    await this.deleteGameUseCase.execute(payload);
  }
}
