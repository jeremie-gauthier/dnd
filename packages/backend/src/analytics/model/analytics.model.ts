import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';

@Injectable()
export class AnalyticsModel extends DatabaseModel {
  public readonly TABLE_NAME = 'analytics';

  constructor(dbService: DatabaseService) {
    super(dbService);
  }

  public async create(data: unknown) {
    return await this.dbService.exec(this.table.insert(data));
  }

  public async getAll() {
    return await this.dbService.exec(this.table);
  }
}
