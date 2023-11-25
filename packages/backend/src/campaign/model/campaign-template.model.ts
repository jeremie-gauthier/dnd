import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';
import { CreateCampaignInputDTO } from '../dto/create-campaign.input.dto';
import { Campaign } from '../types/campaign.type';

@Injectable()
export class CampaignTemplateModel extends DatabaseModel<Campaign> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'campaign_template');
  }

  public async create(campaign: CreateCampaignInputDTO) {
    return await this.dbService.exec(this.table.insert(campaign));
  }

  public async getAll() {
    return await this.dbService.exec(this.table);
  }
}
