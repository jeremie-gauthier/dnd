import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EntityService } from './entity.service';
import { EntityTemplateModel } from './model/entity-template.model';
import { NonPlayableModule } from './non-playable/non-playable.module';
import { PlayableModule } from './playable/playable.module';

@Module({
  imports: [DatabaseModule, NonPlayableModule, PlayableModule],
  providers: [EntityTemplateModel, EntityService],
  exports: [EntityService],
})
export class EntityModule {}
