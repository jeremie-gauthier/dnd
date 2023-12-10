import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EntityTemplateModel } from '../model/entity-template.model';
import { InteractiveModule } from './interactive/interactive.module';
import { NonInteractiveModule } from './non-interactive/non-interactive.module';

@Module({
  imports: [DatabaseModule, InteractiveModule, NonInteractiveModule],
  providers: [EntityTemplateModel],
})
export class NonPlayableModule {}
