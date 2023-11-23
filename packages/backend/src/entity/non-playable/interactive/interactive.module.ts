import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EntityModel } from 'src/entity/model/entity.model';
import { InteractiveService } from './interactive.service';

@Module({
  imports: [DatabaseModule],
  providers: [InteractiveService, EntityModel],
})
export class InteractiveModule {}
