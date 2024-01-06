import { Module } from '@nestjs/common';
import { AuthzModule } from 'src/authz/authz.module';
import { CreateLobbyRepository } from './private/create-lobby/create-lobby.repository';
import { CreateLobbyUseCase } from './private/create-lobby/create-lobby.uc';
import { HandleWsConnectionUseCase } from './private/handle-ws-connection/handle-ws-connection.uc';
import { LobbyPrivateGateway } from './private/lobby-private.gateway';

@Module({
  imports: [AuthzModule],
  providers: [
    LobbyPrivateGateway,
    HandleWsConnectionUseCase,
    CreateLobbyUseCase,
    CreateLobbyRepository,
  ],
})
export class LobbyModule {}
