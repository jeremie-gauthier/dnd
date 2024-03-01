import { Module } from '@nestjs/common';
import { MapModule } from './map/map.module';
import { StartingModule } from './starting/starting.module';

@Module({
  imports: [MapModule, StartingModule],
  providers: [],
})
export class GameModule {}
