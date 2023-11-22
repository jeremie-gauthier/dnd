import { Module } from '@nestjs/common';
import { EnemyModule } from './enemy/enemy.module';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [EnemyModule, CharacterModule]
})
export class PlayableModule {}
