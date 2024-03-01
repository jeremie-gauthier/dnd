import { Injectable } from "@nestjs/common";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import { User } from "src/database/entities/user.entity";
import { CampaignStageProgressionStatus } from "src/database/enums/campaign-stage-progression-status.enum";
import { UseCase } from "src/types/use-case.interface";
import { NewCampaignStartedOutputDto } from "./get-campaigns.dto";
import { GetCampaignsRepository } from "./get-campaigns.repository";

@Injectable()
export class GetCampaignsUseCase implements UseCase {
  constructor(private readonly repository: GetCampaignsRepository) {}

  public async execute({
    userId,
  }: { userId: User["id"] }): Promise<NewCampaignStartedOutputDto> {
    const userCampaignsProgressions =
      await this.repository.getUserCampaignsProgressions(userId);
    return this.getUserCampaignsProgressions(userCampaignsProgressions);
  }

  private getUserCampaignsProgressions(
    campaignProgressions: CampaignProgression[],
  ): NewCampaignStartedOutputDto {
    return campaignProgressions.map((campaignProgression) => {
      return this.getUserCampaignProgression(campaignProgression);
    });
  }

  private getUserCampaignProgression(
    campaignProgression: CampaignProgression,
  ): NewCampaignStartedOutputDto[number] {
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
