import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from '../model.abstract';
import { Entity } from './types/entity-template.type';

@Injectable()
export class EntityTemplateModel extends DatabaseModel<Entity> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'entity_template');
  }
}
