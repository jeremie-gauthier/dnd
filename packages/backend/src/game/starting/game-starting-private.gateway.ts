import { ClientGameEvent, ServerGameEvent } from '@dnd/shared';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameStartingPrivateGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(ClientGameEvent.PlayerIsReady)
  async identity(@MessageBody() data: number): Promise<number> {
    console.log('identity', data, ServerGameEvent.GameStart);
    return data;
  }
}
