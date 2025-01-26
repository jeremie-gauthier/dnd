import { Injectable } from "@nestjs/common";
import type { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import type { User } from "src/database/entities/user.entity";
import { CampaignStageProgressionStatus } from "src/database/enums/campaign-stage-progression-status.enum";
import type { UseCase } from "src/interfaces/use-case.interface";
import type { GetCampaignOutputDto } from "./get-campaigns.dto";
import { GetCampaignsRepository } from "./get-campaigns.repository";

@Injectable()
export class GetCampaignsUseCase implements UseCase {
  constructor(private readonly repository: GetCampaignsRepository) {}

  public async execute({
    userId,
  }: { userId: User["id"] }): Promise<Array<GetCampaignOutputDto>> {
    const userCampaignsProgressions =
      await this.repository.getUserCampaignsProgressions(userId);
    return this.getUserCampaignsProgressions(userCampaignsProgressions);
  }

  private getUserCampaignsProgressions(
    campaignProgressions: CampaignProgression[],
  ): Array<GetCampaignOutputDto> {
    return campaignProgressions.map((campaignProgression) => {
      return this.getUserCampaignProgression(campaignProgression);
    });
  }

  private getUserCampaignProgression(
    campaignProgression: CampaignProgression,
  ): GetCampaignOutputDto {
    const mostAdvancedStage = campaignProgression.stageProgressions.find(
      (stageProgression) =>
        stageProgression.status === CampaignStageProgressionStatus.AVAILABLE,
    )!.stage;

    return {
      ...campaignProgression.campaign,
      currentStage: mostAdvancedStage,
      nbStages: campaignProgression.stageProgressions.length,
    };
  }
}
