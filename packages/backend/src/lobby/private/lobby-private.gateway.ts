import { ClientLobbyEvent } from '@dnd/shared';
import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ZodValidationPipe } from 'nestjs-zod';
import { Server } from 'socket.io';
import { JWTAuthGuard } from 'src/authz/jwt-auth.guard';
import { WsExceptionFilter } from 'src/errors/ws-exception-filter';
import { ServerSocket } from 'src/types/socket.type';
import { CreateLobbyInputDto } from './create-lobby/create-lobby.dto';
import { HandleWsConnectionUseCase } from './handle-ws-connection/handle-ws-connection.uc';

@UseGuards(JWTAuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class LobbyPrivateGateway implements OnGatewayConnection {
  constructor(private readonly handleWsConnectionUseCase: HandleWsConnectionUseCase) {}

  public async handleConnection(client: ServerSocket) {
    await this.handleWsConnectionUseCase.execute(client);
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
