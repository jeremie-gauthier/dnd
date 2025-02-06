import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignStage } from "src/modules/campaign/infra/database/entities/campaign-stage.entity";
import { Campaign } from "src/modules/campaign/infra/database/entities/campaign.entity";
import { Repository } from "typeorm";

@Injectable()
export class RequestCreateLobbyRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
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

  // public async getHeroes({
  //   stageId,
  //   userId,
  // }: {
  //   stageId: CampaignStage["id"];
  //   userId: User["id"];
  // }) {
  //   const heroes = await this.heroRepository.find({
  //     where: {
  //       campaignProgression: {
  //         user: {
  //           id: userId,
  //         },
  //         stageProgressions: {
  //           stage: {
  //             id: stageId,
  //           },
  //         },
  //       },
  //     },
  //     relations: {
  //       inventory: {
  //         stuff: {
  //           item: true,
  //         },
  //       },
  //     },
  //   });

  //   return heroes;
  // }
}
