import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { Hero } from "src/database/entities/hero.entity";
import { User } from "src/database/entities/user.entity";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";
import type { Repository } from "typeorm";

@Injectable()
export class CreateLobbyRepository {
  constructor(
    private readonly lobbiesRepository: LobbiesRepository,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ) {}

  public async createLobby(
    lobby: Omit<LobbyEntity, "id">,
  ): Promise<LobbyEntity> {
    return await this.lobbiesRepository.set(lobby);
  }

  public async getCampaignByStageId({
    stageId,
  }: { stageId: CampaignStage["id"] }): Promise<Campaign> {
    const campaigns = await this.campaignRepository.findOneOrFail({
      select: {
        id: true,
        title: true,
        stages: {
          id: true,
          order: true,
          title: true,
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
    userId: User["id"];
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
