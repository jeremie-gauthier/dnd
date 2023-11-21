import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemModel } from './model/item.model';

@Module({
  imports: [DatabaseModule],
  providers: [ItemModel, ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
