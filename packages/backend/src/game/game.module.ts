import { Module } from '@nestjs/common';
import { GameEventsGateway } from './game-events.gateway';
import { MapModule } from './map/map.module';

@Module({
  imports: [MapModule],
  providers: [GameEventsGateway],
})
export class GameModule {}
