import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EntityModule } from 'src/entity/entity.module';
import { GameEventsGateway } from './game-events.gateway';
import { GameService } from './game.service';
import { GameModel } from './model/game.model';

@Module({
  imports: [DatabaseModule, EntityModule],
  providers: [GameEventsGateway, GameModel, GameService],
})
export class GameModule {}
