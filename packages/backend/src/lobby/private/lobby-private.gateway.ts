import { ClientLobbyEvent } from '@dnd/shared';
import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { ZodValidationPipe } from 'nestjs-zod';
import { Server } from 'socket.io';
import { JWTAuthGuard } from 'src/authz/jwt-auth.guard';
import { JwtService } from 'src/authz/jwt.service';
import { WsExceptionFilter } from 'src/errors/ws-exception-filter';
import { ServerSocket } from 'src/types/socket.type';
import { CreateLobbyInputDto } from './create-lobby/create-lobby.dto';

@UseGuards(JWTAuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class LobbyPrivateGateway implements OnGatewayConnection {
  constructor(private readonly jwtService: JwtService) {}

  public async handleConnection(client: ServerSocket) {
    const token: string | undefined = client.handshake.auth.token;
    if (token === undefined || token === null) {
      client.disconnect(true);
      throw new WsException('No token found during handshake');
    }

    try {
      const decodedToken = await this.jwtService.verify(token);
      if (!decodedToken.sub) {
        throw new WsException('No userId (sub) found in token');
      }

      client.data = {
        userId: decodedToken.sub,
      };
    } catch (error) {
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
  public async requestGameCreation(
    @MessageBody() data: CreateLobbyInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<void> {
    console.log(ClientLobbyEvent.RequestNewGame, data, client.data);
  }
}
