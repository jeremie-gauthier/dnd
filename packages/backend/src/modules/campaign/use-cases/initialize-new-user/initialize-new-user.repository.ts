import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Campaign } from "src/modules/campaign/infra/database/entities/campaign.entity";
import type { Repository } from "typeorm";

@Injectable()
export class InitializeNewUserRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  public async getAvailableCampaignsForNewUsers(): Promise<Campaign[]> {
    return this.campaignRepository.find({
      select: {
        id: true,
      },
    });
  }
}
