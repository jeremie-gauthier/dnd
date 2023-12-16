import { Injectable } from '@nestjs/common';
import { CampaignTemplateModel } from 'src/database/models/campaign-template/campaign-template.model';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignTemplateModel: CampaignTemplateModel) {}
}
