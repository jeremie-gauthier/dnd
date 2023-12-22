import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';

@Module({
  imports: [],
  providers: [EntityService],
})
export class EntityModule {}
