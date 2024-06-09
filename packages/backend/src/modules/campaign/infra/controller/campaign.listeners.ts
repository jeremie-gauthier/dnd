import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { HostRequestedGameStartPayload } from "src/modules/lobby/events/host-requested-game-start.payload";
import { LobbyEvent } from "../../../lobby/events/lobby-event.enum";
import { RequestCreateLobbyPayload } from "../../../lobby/events/request-create-lobby.payload";
import { NewUserCreatedPayload } from "../../../user/events/new-user-created.payload";
import { UserEvent } from "../../../user/events/user-event.enum";
import { CampaignEvent } from "../../events/campaign-event.enum";
import { UnlockCampaignForUserPayload } from "../../events/unlock-campaign-for-user.payload";
import { CreateCampaignForUserUseCase } from "../../use-cases/create-campaign-for-user/create-campaign-for-user.uc";
import { GameInitializationUseCase } from "../../use-cases/game-initialization/game-initialization.uc";
import { InitializeNewUserUseCase } from "../../use-cases/initialize-new-user/initialize-new-user.uc";
import { RequestCreateLobbyUseCase } from "../../use-cases/request-create-lobby/request-create-lobby.uc";

@Injectable()
export class CampaignListeners {
  constructor(
    private readonly initializeNewUserUseCase: InitializeNewUserUseCase,
    private readonly createCampaignForUserUseCase: CreateCampaignForUserUseCase,
    private readonly requestCreateLobbyUseCase: RequestCreateLobbyUseCase,
    private readonly gameInitializationUseCase: GameInitializationUseCase,
  ) {}

  @OnEvent(LobbyEvent.HostRequestedGameStart)
  public async gameInitialization(payload: HostRequestedGameStartPayload) {
    await this.gameInitializationUseCase.execute(payload);
  }

  @OnEvent(UserEvent.NewUserCreated)
  public async initializeNewUser(payload: NewUserCreatedPayload) {
    await this.initializeNewUserUseCase.execute(payload);
  }

  @OnEvent(CampaignEvent.UnlockCampaignForUser)
  public async createCampaignForUser(payload: UnlockCampaignForUserPayload) {
    await this.createCampaignForUserUseCase.execute(payload);
  }

  @OnEvent(LobbyEvent.RequestCreateLobby)
  public async requestCreateLobby(payload: RequestCreateLobbyPayload) {
    await this.requestCreateLobbyUseCase.execute(payload);
  }
}
