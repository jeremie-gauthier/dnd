import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ItemTemplateModel } from 'src/database/models/item-template/item-template.model';
import { ItemService } from './item.service';

@Module({
  imports: [DatabaseModule],
  providers: [ItemTemplateModel, ItemService],
})
export class ItemModule {}
