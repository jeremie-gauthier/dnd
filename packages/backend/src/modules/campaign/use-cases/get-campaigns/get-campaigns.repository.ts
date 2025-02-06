import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignProgression } from "src/modules/campaign/infra/database/entities/campaign-progression.entity";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import type { Repository } from "typeorm";
import { CampaignProgressionStatus } from "../../infra/database/enums/campaign-progression-status.enum";

@Injectable()
export class GetCampaignsRepository {
  constructor(
    @InjectRepository(CampaignProgression)
    private readonly campaignProgressionRepository: Repository<CampaignProgression>,
  ) {}

  public getUserCampaignsProgressions(
    userId: User["id"],
  ): Promise<CampaignProgression[]> {
    return this.campaignProgressionRepository.find({
      where: {
        userId,
        status: CampaignProgressionStatus.AVAILABLE,
      },
      relations: {
        campaign: true,
        stageProgressions: {
          stage: true,
        },
      },
      order: {
        stageProgressions: {
          stage: {
            order: "ASC",
          },
        },
      },
    });
  }
}
