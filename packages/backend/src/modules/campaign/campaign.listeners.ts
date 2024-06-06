import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { NewUserCreatedPayload } from "../user/events/new-user-created.payload";
import { UserEvent } from "../user/events/user-event.enum";
import { CreateCampaignForUserUseCase } from "./create-campaign-for-user/create-campaign-for-user.uc";
import { CampaignEvent } from "./events/campaign-event.enum";
import { UnlockCampaignForUserPayload } from "./events/unlock-campaign-for-user.payload";
import { InitializeNewUserUseCase } from "./initialize-new-user/initialize-new-user.uc";

@Injectable()
export class CampaignListeners {
  constructor(
    private readonly initializeNewUserUseCase: InitializeNewUserUseCase,
    private readonly createCampaignForUserUseCase: CreateCampaignForUserUseCase,
  ) {}

  @OnEvent(UserEvent.NewUserCreated)
  public async initializeNewUser(payload: NewUserCreatedPayload) {
    await this.initializeNewUserUseCase.execute(payload);
  }

  @OnEvent(CampaignEvent.UnlockCampaignForUser)
  public async createCampaignForUser(payload: UnlockCampaignForUserPayload) {
    await this.createCampaignForUserUseCase.execute(payload);
  }
}
