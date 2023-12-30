import { ClientLobbyEvent } from '@dnd/shared';
import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JWTAuthGuard } from 'src/authz/jwt-auth.guard';
import { JwtService } from 'src/authz/jwt.service';

// TODO: replace by a Redis instance
const WS_STORE: Record<string, string> = {};

@UseGuards(JWTAuthGuard)
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class LobbyEventsGateway implements OnGatewayConnection {
  constructor(private readonly jwtService: JwtService) {}

  public async handleConnection(client: Socket) {
    // - get token
    const token: string | undefined = client.handshake.auth.token;

    // - verify token
    if (token === undefined || token === null) {
      client.disconnect(true);
      throw new WsException('No token found during handshake');
    }

    try {
      const decodedToken = await this.jwtService.verify(token);
      if (!decodedToken.sub) {
        throw new WsException('No userId (sub) found in token');
      }

      // - if valid:
      // - - save in memory the socketId with the userId (Or the whole object if I want more data)
      WS_STORE[decodedToken.sub] = client.id;
      WS_STORE[client.id] = decodedToken.sub;
    } catch (error) {
      // - on any error:
      // - - immediatly disconnect the client socket
      client.disconnect(true);
      if (error instanceof Error) {
        throw new WsException(error.message);
      } else {
        throw new WsException('An unknown error happened while verifying the token');
      }
    }

    console.log(`New ws connection (${client.id})`);
  }

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage(ClientLobbyEvent.RequestNewGame)
  public async requestGameCreation(@MessageBody() data: any, ...args: any[]): Promise<void> {
    console.log(ClientLobbyEvent.RequestNewGame, data, args);
  }
}
