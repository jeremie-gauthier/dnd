import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EntityTemplateModel } from 'src/database/models/entity-template/entity-template.model';
import { EntityService } from './entity.service';

@Module({
  imports: [DatabaseModule],
  providers: [EntityTemplateModel, EntityService],
})
export class EntityModule {}
