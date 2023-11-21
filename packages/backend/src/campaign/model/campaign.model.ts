import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';

@Injectable()
export class CampaignModel extends DatabaseModel {
  public static readonly TABLE_NAME = 'campaign';

  constructor(dbService: DatabaseService) {
    super(dbService);
  }

  public async registerTable(): Promise<void> {
    await this._registerTable(CampaignModel.TABLE_NAME);
  }

  public async create(campaign: CampaignModel) {
    return await this.dbService.exec(
      this.dbService.db.table(CampaignModel.TABLE_NAME).insert(campaign),
    );
  }

  public async getAll() {
    return await this.dbService.exec(this.dbService.db.table(CampaignModel.TABLE_NAME));
  }
}
