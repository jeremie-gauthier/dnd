import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { UseCase } from "src/interfaces/use-case.interface";
import { CampaignEvent } from "src/modules/campaign/events/campaign-event.enum";
import { NewCampaignStartedPayload } from "src/modules/campaign/events/new-campaign-started.payload";
import type { CampaignProgression } from "src/modules/campaign/infra/database/entities/campaign-progression.entity";
import type { Campaign } from "src/modules/campaign/infra/database/entities/campaign.entity";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import { CampaignProgressionStatus } from "../../infra/database/enums/campaign-progression-status.enum";
import { CampaignStageProgressionStatus } from "../../infra/database/enums/campaign-stage-progression-status.enum";
import { NewCampaignStartedRepository } from "./new-campaign-started.repository";

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
  }) {
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

    return {
      campaignProgressionId: campaignProgression.id,
    };
  }

  private async startCampaignForUser(
    userId: User["id"],
    campaignId: Campaign["id"],
  ): Promise<CampaignProgression> {
    const campaign =
      await this.repository.getCampaignWithFirstStageById(campaignId);

    const campaignProgression =
      await this.repository.createCampaignProgressionForUser({
        userId,
        campaign,
        status: CampaignProgressionStatus.AVAILABLE,
        stageProgressions: [
          {
            stage: campaign.stages[0],
            status: CampaignStageProgressionStatus.AVAILABLE,
          },
        ],
      });

    return campaignProgression;
  }
}
