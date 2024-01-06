import { Module } from '@nestjs/common';
import { AuthzModule } from 'src/authz/authz.module';
import { HandleWsConnectionUseCase } from './private/handle-ws-connection/handle-ws-connection.uc';
import { LobbyPrivateGateway } from './private/lobby-private.gateway';

@Module({
  imports: [AuthzModule],
  providers: [LobbyPrivateGateway, HandleWsConnectionUseCase],
})
export class LobbyModule {}
