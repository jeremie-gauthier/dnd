import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CampaignEvent } from "../../emitters/campaign-events.enum";
import type { UnlockCampaignForUserPayload } from "../../emitters/unlock-campaign-for-user.payload";
import type { CreateCampaignForUserRepository } from "./create-campaign-for-user.repository";

@Injectable()
export class CreateCampaignForUserListener {
  constructor(private readonly repository: CreateCampaignForUserRepository) {}

  @OnEvent(CampaignEvent.UnlockCampaignForUser)
  public async handler({ userId, campaignId }: UnlockCampaignForUserPayload) {
    await this.repository.createCampaignProgressionForUser({
      userId,
      campaignId,
    });
  }
}
