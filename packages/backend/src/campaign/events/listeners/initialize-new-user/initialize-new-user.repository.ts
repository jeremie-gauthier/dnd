import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/database/entities/campaign.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InitializeNewUserRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  public async getAvailableCampaignsForNewUsers(): Promise<Campaign[]> {
    return this.campaignRepository.find({
      where: [{ title: 'Tutoriel' }, { title: 'Campagne 1' }],
    });
  }
}
