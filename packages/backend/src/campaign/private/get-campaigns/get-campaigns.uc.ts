import { Injectable } from '@nestjs/common';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { UseCase } from 'src/types/use-case.interface';
import { NewCampaignStartedOutputDto } from './get-campaigns.dto';
import { GetCampaignsRepository } from './get-campaigns.repository';

@Injectable()
export class GetCampaignsUseCase implements UseCase {
  constructor(private readonly repository: GetCampaignsRepository) {}

  public async execute({ userId }: { userId: User['id'] }): Promise<NewCampaignStartedOutputDto> {
    const [campaignProgressions, campaigns] = await Promise.all([
      this.repository.getStartedCampaigns(userId),
      this.repository.getAvailableCampaigns(),
    ]);

    return this.getUserCampaignsProgressions({ campaigns, campaignProgressions });
  }

  private getUserCampaignsProgressions({
    campaignProgressions,
    campaigns,
  }: {
    campaignProgressions: CampaignProgression[];
    campaigns: Campaign[];
  }): NewCampaignStartedOutputDto {
    return campaigns.map((campaign) => {
      const campaignProgression = campaignProgressions.find(
        ({ campaignId }) => campaignId === campaign.id,
      );

      return this.getUserCampaignProgression({ campaign, campaignProgression });
    });
  }

  private getUserCampaignProgression({
    campaign,
    campaignProgression,
  }: {
    campaign: Campaign;
    campaignProgression?: CampaignProgression;
  }): NewCampaignStartedOutputDto[number] {
    const FIRST_STAGE = campaign.stages.at(0)!;
    const mostAdvancedStage = campaignProgression?.stageProgressions
      .sort((a, b) => b.stage.order - a.stage.order)
      .at(0)?.stage;

    return {
      ...campaign,
      currentStage: mostAdvancedStage ?? FIRST_STAGE,
      nbStages: campaign.stages.length,
    };
  }
}
