import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from '../model.abstract';
import { Item } from './item-template.type';

@Injectable()
export class ItemTemplateModel extends DatabaseModel<Item> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'item_template');
  }
}
