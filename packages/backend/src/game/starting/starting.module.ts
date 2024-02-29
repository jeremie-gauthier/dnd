import { Module } from '@nestjs/common';
import { GameStartingPrivateGateway } from './game-starting-private.gateway';

@Module({
  providers: [GameStartingPrivateGateway],
})
export class StartingModule {}
