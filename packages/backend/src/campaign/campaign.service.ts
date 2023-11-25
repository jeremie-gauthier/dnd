import { Injectable } from '@nestjs/common';
import { CreateCampaignInputDTO } from './dto/create-campaign.input.dto';
import { CampaignTemplateModel } from './model/campaign-template.model';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignTemplateModel: CampaignTemplateModel) {}

  public async create(campaign: CreateCampaignInputDTO) {
    const dbResult = await this.campaignTemplateModel.create(campaign);
    return dbResult;
  }

  public async getAll() {
    const campaigns = await this.campaignTemplateModel.getAll();
    return campaigns;
  }
}
