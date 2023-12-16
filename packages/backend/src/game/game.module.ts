import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GameEventsGateway } from './game-events.gateway';
import { GameService } from './game.service';

@Module({
  imports: [DatabaseModule],
  providers: [GameEventsGateway, GameService],
})
export class GameModule {}
