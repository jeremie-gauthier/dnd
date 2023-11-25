import { ClientLobbyEvent } from '@dnd/shared';
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
export class LobbyEventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(ClientLobbyEvent.RequestNewGame)
  public async requestGameCreation(@MessageBody() data: any): Promise<void> {
    console.log(ClientLobbyEvent.RequestNewGame, data);
  }
}
