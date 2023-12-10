import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemTemplateModel } from './model/item-template.model';

@Module({
  imports: [DatabaseModule],
  providers: [ItemTemplateModel, ItemService],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
