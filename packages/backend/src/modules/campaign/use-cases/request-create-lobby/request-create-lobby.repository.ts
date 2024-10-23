import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { Hero } from "src/database/entities/hero.entity";
import { Repository } from "typeorm";

@Injectable()
export class RequestCreateLobbyRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ) {}

  public async getCampaign({
    stageId,
  }: { stageId: CampaignStage["id"] }): Promise<Campaign> {
    const campaigns = await this.campaignRepository.findOneOrFail({
      select: {
        id: true,
        stages: {
          id: true,
          order: true,
        },
      },
      where: {
        stages: {
          id: stageId,
        },
      },
      relations: {
        stages: true,
      },
    });

    return campaigns;
  }

  public async getHeroes({
    stageId,
    userId,
  }: {
    stageId: CampaignStage["id"];
    userId: CampaignProgression["user"]["id"];
  }) {
    const heroes = await this.heroRepository.find({
      where: {
        campaignProgression: {
          user: {
            id: userId,
          },
          stageProgressions: {
            stage: {
              id: stageId,
            },
          },
        },
      },
      relations: {
        inventory: {
          stuff: {
            item: true,
          },
        },
      },
    });

    return heroes;
  }
}
