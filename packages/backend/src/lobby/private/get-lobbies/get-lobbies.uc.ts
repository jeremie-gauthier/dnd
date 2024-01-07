import { Injectable } from '@nestjs/common';
import { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { UseCase } from 'src/types/use-case.interface';
import { GetLobbiesOutputDto } from './get-lobbies.dto';
import { GetLobbiesRepository } from './get-lobbies.repository';

@Injectable()
export class GetLobbiesUseCase implements UseCase {
  constructor(private readonly repository: GetLobbiesRepository) {}

  public async execute(): Promise<GetLobbiesOutputDto> {
    const lobbies = await this.repository.getLobbies();
    if (lobbies.length === 0) {
      return [];
    }

    const stageIds = new Set(lobbies.map((lobby) => lobby.config.stageId));
    const campaigns = await this.repository.getCampaigns([...stageIds]);

    const lobbiesWithDetails: GetLobbiesOutputDto = lobbies.map((lobby) => {
      const stageId = lobby.config.stageId;
      const campaign = this.getCampaignByStageId(campaigns, stageId);

      return {
        ...lobby,
        config: {
          ...lobby.config,
          campaign: {
            id: campaign.id,
            title: campaign.title,
            nbStages: campaign.stages.length,
            stage: this.getStageById(campaign.stages, stageId),
          },
        },
        nbPlayers: lobby.players.length,
      };
    });

    return lobbiesWithDetails;
  }

  private getCampaignByStageId(campaigns: Campaign[], stageId: CampaignStage['id']): Campaign {
    return campaigns.find(({ stages }) => stages.some(({ id }) => id === stageId))!;
  }

  private getStageById(stages: CampaignStage[], stageId: CampaignStage['id']): CampaignStage {
    return stages.find(({ id }) => id === stageId)!;
  }
}
