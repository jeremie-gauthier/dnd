import { Module } from '@nestjs/common';
import { GameEventsGateway } from './game-events.gateway';
import { MapModule } from './map/map.module';
import { StartingModule } from './starting/starting.module';

@Module({
  imports: [MapModule, StartingModule],
  providers: [GameEventsGateway],
})
export class GameModule {}
