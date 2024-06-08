import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { LobbyEvent } from "../lobby/events/lobby-event.enum";
import { RequestCreateLobbyPayload } from "../lobby/events/request-create-lobby.payload";
import { NewUserCreatedPayload } from "../user/events/new-user-created.payload";
import { UserEvent } from "../user/events/user-event.enum";
import { CreateCampaignForUserUseCase } from "./create-campaign-for-user/create-campaign-for-user.uc";
import { CampaignEvent } from "./events/campaign-event.enum";
import { UnlockCampaignForUserPayload } from "./events/unlock-campaign-for-user.payload";
import { InitializeNewUserUseCase } from "./initialize-new-user/initialize-new-user.uc";
import { RequestCreateLobbyUseCase } from "./request-create-lobby/request-create-lobby.uc";

@Injectable()
export class CampaignListeners {
  constructor(
    private readonly initializeNewUserUseCase: InitializeNewUserUseCase,
    private readonly createCampaignForUserUseCase: CreateCampaignForUserUseCase,
    private readonly requestCreateLobbyUseCase: RequestCreateLobbyUseCase,
  ) {}

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
