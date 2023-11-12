import { Module } from '@nestjs/common';
import { WsEventsGateway } from './ws-events.gateway';

@Module({
  providers: [WsEventsGateway],
})
export class WsEventsModule {}
