import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { CampaignEvent } from "src/modules/campaign/events/campaign-event.enum";
import { RequestCreateLobbyFulfilledPayload } from "src/modules/campaign/events/request-create-lobby-fulfilled.payload";
import { GameEvent } from "src/modules/game/events/game-event.enum";
import { GameInitializationDonePayload } from "src/modules/game/events/game-initialization-done.payload";
import { LobbyCreatedPayload } from "src/modules/shared/events/lobby/lobby-created.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { CreateLobbyUseCase } from "./use-cases/create-lobby/create-lobby.uc";
import { GameInitializationDoneUseCase } from "./use-cases/game-initialization-done/game-initialization-done.uc";

@Injectable()
export class LobbyListeners {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly gameInitializationDoneUseCase: GameInitializationDoneUseCase,
    private readonly createLobbyUseCase: CreateLobbyUseCase,
  ) {}

  @OnEvent(GameEvent.GameInitializationDone)
  public async gameInitializationDone(payload: GameInitializationDonePayload) {
    await this.gameInitializationDoneUseCase.execute(payload);
  }

  @OnEvent(CampaignEvent.RequestCreateLobbyFulfilled)
  public async createLobby(payload: RequestCreateLobbyFulfilledPayload) {
    const lobby = await this.createLobbyUseCase.execute(payload);

    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyCreated,
      new LobbyCreatedPayload({
        lobby,
        userId: payload.userId,
      }),
    );
  }
}
