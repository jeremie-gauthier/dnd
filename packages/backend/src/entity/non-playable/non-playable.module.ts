import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EntityModel } from '../model/entity.model';
import { InteractiveModule } from './interactive/interactive.module';
import { NonInteractiveModule } from './non-interactive/non-interactive.module';

@Module({
  imports: [DatabaseModule, InteractiveModule, NonInteractiveModule],
  providers: [EntityModel],
})
export class NonPlayableModule {}
