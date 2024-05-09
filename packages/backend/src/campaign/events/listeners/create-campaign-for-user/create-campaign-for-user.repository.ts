import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import type { Campaign } from "src/database/entities/campaign.entity";
import { HeroTemplate } from "src/database/entities/hero-template.entity";
import type { DeepPartial, Repository } from "typeorm";

@Injectable()
export class CreateCampaignForUserRepository {
  constructor(
    @InjectRepository(HeroTemplate)
    private readonly heroTemplateRepository: Repository<HeroTemplate>,
    @InjectRepository(CampaignStage)
    private readonly campaignStageRepository: Repository<CampaignStage>,
    @InjectRepository(CampaignProgression)
    private readonly campaignProgressionRepository: Repository<CampaignProgression>,
  ) {}

  public getAvailableHeroesForCampaign({
    campaignId,
  }: { campaignId: Campaign["id"] }): Promise<HeroTemplate[]> {
    return this.heroTemplateRepository.find({
      where: {
        playableInCampaigns: {
          id: campaignId,
        },
      },
    });
  }

  public getCampaignStages({
    campaignId,
  }: { campaignId: Campaign["id"] }): Promise<CampaignStage[]> {
    return this.campaignStageRepository.find({
      select: {
        id: true,
        status: true,
        order: true,
      },
      where: {
        campaign: {
          id: campaignId,
        },
      },
    });
  }

  public createCampaignProgression(
    campaignProgression: DeepPartial<CampaignProgression>,
  ) {
    return this.campaignProgressionRepository.save(campaignProgression);
  }
}
