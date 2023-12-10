import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EntityTemplateModel } from 'src/entity/model/entity-template.model';
import { InteractiveService } from './interactive.service';

@Module({
  imports: [DatabaseModule],
  providers: [InteractiveService, EntityTemplateModel],
  exports: [InteractiveService],
})
export class InteractiveModule {}
