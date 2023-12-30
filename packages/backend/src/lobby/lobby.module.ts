import { Module } from '@nestjs/common';
import { AuthzModule } from 'src/authz/authz.module';
import { LobbyEventsGateway } from './lobby-events.gateway';

@Module({
  imports: [AuthzModule],
  providers: [LobbyEventsGateway],
})
export class LobbyModule {}
