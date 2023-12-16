import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from '../model.abstract';

@Injectable()
export class AnalyticsModel extends DatabaseModel<any> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'analytics');
  }
}
