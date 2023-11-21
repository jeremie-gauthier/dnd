import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';
import { CreateCampaignInputDTO } from '../dto/create-campaign.input.dto';

@Injectable()
export class CampaignModel extends DatabaseModel {
  public readonly TABLE_NAME = 'campaign';

  constructor(dbService: DatabaseService) {
    super(dbService);
  }

  public async create(campaign: CreateCampaignInputDTO) {
    return await this.dbService.exec(this.table.insert(campaign));
  }

  public async getAll() {
    return await this.dbService.exec(this.table);
  }
}
