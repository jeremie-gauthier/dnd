import { ClientLobbyEvent } from "@dnd/shared";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ZodValidationPipe } from "nestjs-zod";
import { JWTAuthGuard } from "src/authz/jwt-auth.guard";
import { WsExceptionFilter } from "src/errors/ws-exception-filter";
import type { ServerSocket, WsServer } from "src/types/socket.type";
import {
  type CreateLobbyInputDto,
  CreateLobbyOutputDto,
} from "./create-lobby/create-lobby.dto";
import type { CreateLobbyUseCase } from "./create-lobby/create-lobby.uc";
import type { DiscardHeroInputDto } from "./discard-hero/discard-hero.dto";
import type { DiscardHeroUseCase } from "./discard-hero/discard-hero.uc";
import type { HandleWsConnectionUseCase } from "./handle-ws-connection/handle-ws-connection.uc";
import type { HandleWsDisconnectionUseCase } from "./handle-ws-disconnection/handle-ws-disconnection.uc";
import {
  type JoinLobbyInputDto,
  JoinLobbyOutputDto,
} from "./join-lobby/join-lobby.dto";
import type { JoinLobbyUseCase } from "./join-lobby/join-lobby.uc";
import { LeaveLobbyOutputDto } from "./leave-lobby/leave-lobby.dto";
import type { LeaveLobbyUseCase } from "./leave-lobby/leave-lobby.uc";
import type { ListenLobbiesChangesUseCase } from "./listen-lobbies-changes/listen-lobbies-changes.uc";
import type { PickHeroInputDto } from "./pick-hero/pick-hero.dto";
import type { PickHeroUseCase } from "./pick-hero/pick-hero.uc";
import type { StartGameInputDto } from "./start-game/start-game.dto";
import type { StartGameUseCase } from "./start-game/start-game.uc";
import type { TogglePlayerReadyStateInputDto } from "./toggle-player-ready-state/toggle-player-ready-state.dto";
import type { TogglePlayerReadyStateUseCase } from "./toggle-player-ready-state/toggle-player-ready-state.uc";

@UseGuards(JWTAuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: "http://localhost:5173",
  },
})
export class LobbyPrivateGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly handleWsConnectionUseCase: HandleWsConnectionUseCase,
    private readonly handleWsDisconnectionUseCase: HandleWsDisconnectionUseCase,
    private readonly createLobbyUseCase: CreateLobbyUseCase,
    private readonly joinLobbyUseCase: JoinLobbyUseCase,
    private readonly leaveLobbyUseCase: LeaveLobbyUseCase,
    private readonly listenLobbiesChangesUseCase: ListenLobbiesChangesUseCase,
    private readonly pickHeroUseCase: PickHeroUseCase,
    private readonly discardHeroUseCase: DiscardHeroUseCase,
    private readonly togglePlayerReadyStateUseCase: TogglePlayerReadyStateUseCase,
    private readonly startGameUseCase: StartGameUseCase,
  ) {}

  @WebSocketServer()
  private readonly server: WsServer;

  public async handleConnection(client: ServerSocket) {
    await this.handleWsConnectionUseCase.execute(client);
  }

  public async handleDisconnect(client: ServerSocket) {
    await this.handleWsDisconnectionUseCase.execute(
      this.getMessageContext(client),
    );
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
    return { message: "You are now listening on lobbies changes" };
  }

  @SubscribeMessage(ClientLobbyEvent.RequestLeaveLobby)
  public async leaveLobby(@ConnectedSocket() client: ServerSocket) {
    await this.leaveLobbyUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
    });
    return LeaveLobbyOutputDto.schema.parse({ message: "Ok" });
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

  @SubscribeMessage(ClientLobbyEvent.RequestDiscardHero)
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

  @SubscribeMessage(ClientLobbyEvent.RequestToggleReadyState)
  public async toggleReadyState(
    @MessageBody() toggleReadyStateDto: TogglePlayerReadyStateInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.togglePlayerReadyStateUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
      ...toggleReadyStateDto,
    });
  }

  @SubscribeMessage(ClientLobbyEvent.RequestStartLobby)
  public async startLobby(
    @MessageBody() startGameDto: StartGameInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.startGameUseCase.execute({
      ctx: this.getMessageContext(client),
      userId: client.data.userId,
      ...startGameDto,
    });
  }
}
