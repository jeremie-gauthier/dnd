import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { HeroTemplate } from "src/database/entities/hero-template.entity";
import { Hero } from "src/database/entities/hero.entity";
import { CampaignProgressionStatus } from "src/database/enums/campaign-progression-status.enum";
import { CampaignStageProgressionStatus } from "src/database/enums/campaign-stage-progression-status.enum";
import { DeepPartial } from "typeorm";
import { CampaignEvent } from "../../emitters/campaign-event.enum";
import type { UnlockCampaignForUserPayload } from "../../emitters/unlock-campaign-for-user.payload";
import { CreateCampaignForUserRepository } from "./create-campaign-for-user.repository";

@Injectable()
export class CreateCampaignForUserListener {
  constructor(private readonly repository: CreateCampaignForUserRepository) {}

  @OnEvent(CampaignEvent.UnlockCampaignForUser)
  public async handler({ userId, campaignId }: UnlockCampaignForUserPayload) {
    const [heroesTemplate, campaignStages] = await Promise.all([
      this.repository.getAvailableHeroesForCampaign({ campaignId }),
      this.repository.getCampaignStages({ campaignId }),
    ]);

    return await this.repository.createCampaignProgression({
      campaign: {
        id: campaignId,
      },
      user: {
        id: userId,
      },
      heroes: this.getHeroesFromTemplate(heroesTemplate),
      status: CampaignProgressionStatus.AVAILABLE,
      stageProgressions: campaignStages.map((campaignStage) => ({
        stage: { id: campaignStage.id },
        status: this.isFirstStage(campaignStage)
          ? CampaignStageProgressionStatus.AVAILABLE
          : CampaignStageProgressionStatus.LOCKED,
      })),
    });
  }

  private getHeroesFromTemplate(
    heroesTemplate: HeroTemplate[],
  ): DeepPartial<Hero>[] {
    return heroesTemplate.map((heroTemplate) => ({
      characteristic: heroTemplate.characteristic,
      name: heroTemplate.name,
      class: heroTemplate.class,
      level: heroTemplate.level,
      inventory: {
        storageCapacity: heroTemplate.inventory.storageCapacity,
        stuff: heroTemplate.inventory.items.map(
          ({ itemName, storageSpace }) => ({
            storageSpace,
            item: {
              name: itemName,
            },
          }),
        ),
      },
    }));
  }

  private isFirstStage(campaignStage: CampaignStage): boolean {
    return campaignStage.order === 1;
  }
}
