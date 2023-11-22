import { Module } from '@nestjs/common';
import { NonPlayableModule } from './non-playable/non-playable.module';
import { PlayableModule } from './playable/playable.module';

@Module({
  imports: [NonPlayableModule, PlayableModule],
})
export class EntityModule {}
