import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { HeroTemplate } from "src/database/entities/hero-template.entity";
import type { Hero } from "src/database/entities/hero.entity";
import { User } from "src/database/entities/user.entity";
import { CampaignProgressionStatus } from "src/database/enums/campaign-progression-status.enum";
import { CampaignStageProgressionStatus } from "src/database/enums/campaign-stage-progression-status.enum";
import { Repository } from "typeorm";

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

  public async createCampaignProgressionForUser({
    campaignId,
    userId,
  }: {
    userId: User["id"];
    campaignId: Campaign["id"];
  }): Promise<CampaignProgression> {
    const [heroesTemplate, campaignStages] = await Promise.all([
      this.getAvailableHeroesForCampaign(campaignId),
      this.getCampaignStages(campaignId),
    ]);

    const heroes = this.getHeroesFromTemplate(heroesTemplate);

    return await this.campaignProgressionRepository.save({
      campaign: {
        id: campaignId,
      },
      user: {
        id: userId,
      },
      heroes,
      status: CampaignProgressionStatus.AVAILABLE,
      stageProgressions: campaignStages.map((campaignStage) => ({
        stage: { id: campaignStage.id },
        status: this.isFirstStage(campaignStage)
          ? CampaignStageProgressionStatus.AVAILABLE
          : CampaignStageProgressionStatus.LOCKED,
      })),
    });
  }

  private getAvailableHeroesForCampaign(
    campaignId: Campaign["id"],
  ): Promise<HeroTemplate[]> {
    return this.heroTemplateRepository.find({
      where: {
        playableInCampaigns: {
          id: campaignId,
        },
      },
    });
  }

  private getCampaignStages(
    campaignId: Campaign["id"],
  ): Promise<CampaignStage[]> {
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

  private getHeroesFromTemplate(
    heroesTemplate: HeroTemplate[],
  ): Partial<Hero>[] {
    return heroesTemplate.map((heroTemplate) => ({
      baseActionPoints: heroTemplate.baseActionPoints,
      baseArmorClass: heroTemplate.baseArmorClass,
      baseHealthPoints: heroTemplate.baseHealthPoints,
      baseManaPoints: heroTemplate.baseManaPoints,
      baseMovementPoints: heroTemplate.baseMovementPoints,
      name: heroTemplate.name,
      class: heroTemplate.class,
      level: heroTemplate.level,
    }));
  }

  private isFirstStage(campaignStage: CampaignStage): boolean {
    return campaignStage.order === 1;
  }
}
