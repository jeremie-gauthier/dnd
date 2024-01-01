import { Module } from '@nestjs/common';
import { AuthzModule } from 'src/authz/authz.module';
import { LobbyPrivateGateway } from './private/lobby-private.gateway';

@Module({
  imports: [AuthzModule],
  providers: [LobbyPrivateGateway],
})
export class LobbyModule {}
