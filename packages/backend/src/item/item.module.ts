import { Module } from '@nestjs/common';
import { ItemService } from './item.service';

@Module({
  imports: [],
  providers: [ItemService],
})
export class ItemModule {}
