import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignProgression } from "src/modules/campaign/infra/database/entities/campaign-progression.entity";
import { Campaign } from "src/modules/campaign/infra/database/entities/campaign.entity";
import type { DeepPartial, Repository } from "typeorm";
import { CampaignStageStatus } from "../../infra/database/enums/campaign-stage-status.enum";
import { CampaignStatus } from "../../infra/database/enums/campaign-status.enum";

@Injectable()
export class NewCampaignStartedRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(CampaignProgression)
    private readonly campaignProgressionRepository: Repository<CampaignProgression>,
  ) {}

  public async getCampaignWithFirstStageById(
    campaignId: Campaign["id"],
  ): Promise<Campaign> {
    return await this.campaignRepository.findOneOrFail({
      select: {
        id: true,
        status: true,
        stages: {
          id: true,
          order: true,
          status: true,
        },
      },
      relations: {
        stages: true,
      },
      where: {
        id: campaignId,
        status: CampaignStatus.AVAILABLE,
        stages: {
          order: 1,
          status: CampaignStageStatus.AVAILABLE,
        },
      },
    });
  }

  public async createCampaignProgressionForUser(
    campaignProgression: DeepPartial<CampaignProgression>,
  ): Promise<CampaignProgression> {
    return await this.campaignProgressionRepository.save(campaignProgression);
  }
}
