import { Module } from '@nestjs/common';
import { GameEventsGateway } from './game-events.gateway';
import { GameService } from './game.service';

@Module({
  imports: [],
  providers: [GameEventsGateway, GameService],
})
export class GameModule {}
