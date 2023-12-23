import { Module } from '@nestjs/common';
import { GameEventsGateway } from './game-events.gateway';

@Module({
  imports: [],
  providers: [GameEventsGateway],
})
export class GameModule {}
