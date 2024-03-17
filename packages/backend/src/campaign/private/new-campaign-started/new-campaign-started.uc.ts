import { Injectable } from "@nestjs/common";
import type { EventEmitter2 } from "@nestjs/event-emitter";
import { CampaignEvent } from "src/campaign/events/emitters/campaign-events.enum";
import { NewCampaignStartedPayload } from "src/campaign/events/emitters/new-campaign-started.payload";
import type { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import type { Campaign } from "src/database/entities/campaign.entity";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import type { NewCampaignStartedRepository } from "./new-campaign-started.repository";

@Injectable()
export class NewCampaignStartedUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: NewCampaignStartedRepository,
  ) {}

  public async execute({
    userId,
    campaignId,
  }: {
    userId: User["id"];
    campaignId: Campaign["id"];
  }): Promise<CampaignProgression> {
    const campaignProgression = await this.startCampaignForUser(
      userId,
      campaignId,
    );

    this.eventEmitter.emitAsync(
      CampaignEvent.NewCampaignStarted,
      new NewCampaignStartedPayload({
        userId,
        campaignId,
        campaignProgressionId: campaignProgression.id,
      }),
    );

    return campaignProgression;
  }

  private async startCampaignForUser(
    userId: User["id"],
    campaignId: Campaign["id"],
  ): Promise<CampaignProgression> {
    const campaign =
      await this.repository.getCampaignWithFirstStageById(campaignId);

    const campaignProgression =
      await this.repository.createCampaignProgressionForUser(userId, campaign);

    return campaignProgression;
  }
}
