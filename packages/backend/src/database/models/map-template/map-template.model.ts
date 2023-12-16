import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from '../model.abstract';
import { MapTemplate } from './map-template.type';

@Injectable()
export class MapTemplateModel extends DatabaseModel<MapTemplate> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'map_template');
  }
}
