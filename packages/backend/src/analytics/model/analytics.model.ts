import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';

@Injectable()
export class AnalyticsModel extends DatabaseModel<any> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'analytics');
  }

  public async create(data: unknown) {
    return await this.dbService.exec(this.table.insert(data));
  }

  public async getAll() {
    return await this.dbService.exec(this.table);
  }
}
