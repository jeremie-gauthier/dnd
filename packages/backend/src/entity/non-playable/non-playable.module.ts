import { Module } from '@nestjs/common';
import { InteractiveModule } from './interactive/interactive.module';
import { NonInteractiveModule } from './non-interactive/non-interactive.module';

@Module({
  imports: [InteractiveModule, NonInteractiveModule],
})
export class NonPlayableModule {}
