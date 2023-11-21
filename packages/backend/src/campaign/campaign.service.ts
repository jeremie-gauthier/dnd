import { Injectable } from '@nestjs/common';
import { CreateCampaignInputDTO } from './dto/create-campaign.input.dto';
import { CampaignModel } from './model/campaign.model';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignModel: CampaignModel) {}

  public async create(campaign: CreateCampaignInputDTO) {
    const dbResult = await this.campaignModel.create(campaign);
    return dbResult;
  }
}
