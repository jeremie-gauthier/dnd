import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EntityModel } from './model/entity.model';
import { NonPlayableModule } from './non-playable/non-playable.module';
import { PlayableModule } from './playable/playable.module';

@Module({
  imports: [DatabaseModule, NonPlayableModule, PlayableModule],
  providers: [EntityModel],
})
export class EntityModule {}
