import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { HeroTemplate } from 'src/database/entities/hero-template.entity';
import type { Hero } from 'src/database/entities/hero.entity';
import { User } from 'src/database/entities/user.entity';
import { CampaignProgressionStatus } from 'src/database/enums/campaign-progression-status.enum';
import { CampaignStageStatus } from 'src/database/enums/campaign-stage-status.enum';
import { Repository } from 'typeorm';

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
    userId: User['id'];
    campaignId: Campaign['id'];
  }): Promise<CampaignProgression> {
    const [heroesTemplate, campaignFirstStage] = await Promise.all([
      this.getAvailableHeroesForCampaign(campaignId),
      this.getFirstCampaignStage(campaignId),
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
      stageProgressions: [
        {
          stage: {
            id: campaignFirstStage.id,
          },
          status: CampaignStageStatus.AVAILABLE,
        },
      ],
    });
  }

  private getAvailableHeroesForCampaign(campaignId: Campaign['id']): Promise<HeroTemplate[]> {
    return this.heroTemplateRepository.find({
      where: {
        playableInCampaigns: {
          id: campaignId,
        },
      },
    });
  }

  private getFirstCampaignStage(campaignId: Campaign['id']): Promise<CampaignStage> {
    return this.campaignStageRepository.findOneOrFail({
      where: {
        campaign: {
          id: campaignId,
        },
        order: 1,
        status: CampaignStageStatus.AVAILABLE,
      },
    });
  }

  private getHeroesFromTemplate(heroesTemplate: HeroTemplate[]): Partial<Hero>[] {
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
}
