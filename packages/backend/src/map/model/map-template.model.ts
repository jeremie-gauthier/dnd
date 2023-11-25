import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';
import { Map } from '../types/map.type';

@Injectable()
export class MapTemplateModel extends DatabaseModel<Map> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'map_template');
  }
}
