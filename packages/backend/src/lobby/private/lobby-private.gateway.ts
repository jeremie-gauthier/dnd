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
import { JWTAuthGuard } from 'src/authz/jwt-auth.guard';
import { WsExceptionFilter } from 'src/errors/ws-exception-filter';
import { ServerSocket, WsServer } from 'src/types/socket.type';
import { CreateLobbyInputDto, CreateLobbyOutputDto } from './create-lobby/create-lobby.dto';
import { CreateLobbyUseCase } from './create-lobby/create-lobby.uc';
import { HandleWsConnectionUseCase } from './handle-ws-connection/handle-ws-connection.uc';
import { JoinLobbyInputDto, JoinLobbyOutputDto } from './join-lobby/join-lobby.dto';
import { JoinLobbyUseCase } from './join-lobby/join-lobby.uc';
import { ListenLobbiesChangesUseCase } from './listen-lobbies-changes/listen-lobbies-changes.uc';

@UseGuards(JWTAuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class LobbyPrivateGateway implements OnGatewayConnection {
  constructor(
    private readonly handleWsConnectionUseCase: HandleWsConnectionUseCase,
    private readonly createLobbyUseCase: CreateLobbyUseCase,
    private readonly joinLobbyUseCase: JoinLobbyUseCase,
    private readonly listenLobbiesChangesUseCase: ListenLobbiesChangesUseCase,
  ) {}

  @WebSocketServer()
  private readonly server: WsServer;

  public async handleConnection(client: ServerSocket) {
    await this.handleWsConnectionUseCase.execute(client);
  }

  // TODO: implem handleDisconnect

  private getMessageContext(client: ServerSocket) {
    return {
      server: this.server,
      client,
    };
  }

  @SubscribeMessage(ClientLobbyEvent.RequestCreateLobby)
  public async requestLobbyCreation(
    @MessageBody() createLobbyInputDto: CreateLobbyInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<CreateLobbyOutputDto> {
    const lobby = await this.createLobbyUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
      createLobbyInputDto,
    });
    return CreateLobbyOutputDto.schema.parse(lobby);
  }

  @SubscribeMessage(ClientLobbyEvent.RequestJoinLobby)
  public async joinLobby(
    @MessageBody() joinLobbyDto: JoinLobbyInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    const lobbyId = await this.joinLobbyUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
      ...joinLobbyDto,
    });
    return JoinLobbyOutputDto.schema.parse({ lobbyId });
  }

  @SubscribeMessage(ClientLobbyEvent.ListenLobbiesChanges)
  public async listenLobbiesChanges(@ConnectedSocket() client: ServerSocket) {
    await this.listenLobbiesChangesUseCase.execute(client);
    return { message: 'You are now listening on lobbies changes' };
  }
}
