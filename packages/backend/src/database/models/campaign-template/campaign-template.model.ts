import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from '../model.abstract';
import { CampaignTemplate } from './campaign-template.type';

@Injectable()
export class CampaignTemplateModel extends DatabaseModel<CampaignTemplate> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'campaign_template');
  }
}
