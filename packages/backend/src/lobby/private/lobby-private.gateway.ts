import { ClientLobbyEvent } from '@dnd/shared';
import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
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
import { DiscardHeroInputDto } from './discard-hero/discard-hero.dto';
import { DiscardHeroUseCase } from './discard-hero/discard-hero.uc';
import { HandleWsConnectionUseCase } from './handle-ws-connection/handle-ws-connection.uc';
import { HandleWsDisconnectionUseCase } from './handle-ws-disconnection/handle-ws-disconnection.uc';
import { JoinLobbyInputDto, JoinLobbyOutputDto } from './join-lobby/join-lobby.dto';
import { JoinLobbyUseCase } from './join-lobby/join-lobby.uc';
import { LeaveLobbyOutputDto } from './leave-lobby/leave-lobby.dto';
import { LeaveLobbyUseCase } from './leave-lobby/leave-lobby.uc';
import { ListenLobbiesChangesUseCase } from './listen-lobbies-changes/listen-lobbies-changes.uc';
import { PickHeroInputDto } from './pick-hero/pick-hero.dto';
import { PickHeroUseCase } from './pick-hero/pick-hero.uc';

@UseGuards(JWTAuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class LobbyPrivateGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly handleWsConnectionUseCase: HandleWsConnectionUseCase,
    private readonly handleWsDisconnectionUseCase: HandleWsDisconnectionUseCase,
    private readonly createLobbyUseCase: CreateLobbyUseCase,
    private readonly joinLobbyUseCase: JoinLobbyUseCase,
    private readonly leaveLobbyUseCase: LeaveLobbyUseCase,
    private readonly listenLobbiesChangesUseCase: ListenLobbiesChangesUseCase,
    private readonly pickHeroUseCase: PickHeroUseCase,
    private readonly discardHeroUseCase: DiscardHeroUseCase,
  ) {}

  @WebSocketServer()
  private readonly server: WsServer;

  public async handleConnection(client: ServerSocket) {
    await this.handleWsConnectionUseCase.execute(client);
  }

  public async handleDisconnect(client: ServerSocket) {
    await this.handleWsDisconnectionUseCase.execute(this.getMessageContext(client));
  }

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

  @SubscribeMessage(ClientLobbyEvent.RequestLeaveLobby)
  public async leaveLobby(@ConnectedSocket() client: ServerSocket) {
    await this.leaveLobbyUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
    });
    return LeaveLobbyOutputDto.schema.parse({ message: 'Ok' });
  }

  @SubscribeMessage(ClientLobbyEvent.RequestPickHero)
  public async pickHero(
    @MessageBody() pickHeroDto: PickHeroInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.pickHeroUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
      ...pickHeroDto,
    });
  }

  @SubscribeMessage(ClientLobbyEvent.RequestPickHero)
  public async discardHero(
    @MessageBody() discardHeroDto: DiscardHeroInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.discardHeroUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
      ...discardHeroDto,
    });
  }
}
