import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import type { User } from "src/database/entities/user.entity";
import { CampaignProgressionStatus } from "src/database/enums/campaign-progression-status.enum";
import type { Repository } from "typeorm";

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
        user: {
          id: userId,
        },
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
