import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';

@Module({
  providers: [LobbyService]
})
export class LobbyModule {}
