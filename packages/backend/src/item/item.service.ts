import { Injectable } from '@nestjs/common';
import { ItemTemplateModel } from 'src/database/models/item-template/item-template.model';

@Injectable()
export class ItemService {
  constructor(private readonly itemModel: ItemTemplateModel) {}
}
