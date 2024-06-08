import { ClientLobbyEvent } from "@dnd/shared";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
} from "@nestjs/websockets";
import { ZodValidationPipe } from "nestjs-zod";
import { WsExceptionFilter } from "src/errors/ws-exception-filter";
import { AuthGuard } from "src/guards/auth.guard";
import type { ServerSocket } from "src/interfaces/socket.interface";
import { LobbyEvent } from "../../events/lobby-event.enum";
import { RequestCreateLobbyPayload } from "../../events/request-create-lobby.payload";
import { LOBBIES_ROOM } from "../../shared/constants";
import { type CreateLobbyInputDto } from "../../use-cases/create-lobby/create-lobby.dto";
import { DiscardGameMasterInputDto } from "../../use-cases/discard-game-master/discard-game-master.dto";
import { DiscardGameMasterUseCase } from "../../use-cases/discard-game-master/discard-game-master.uc";
import type { DiscardHeroInputDto } from "../../use-cases/discard-hero/discard-hero.dto";
import { DiscardHeroUseCase } from "../../use-cases/discard-hero/discard-hero.uc";
import { HandleWsConnectionUseCase } from "../../use-cases/handle-ws-connection/handle-ws-connection.uc";
import { HandleWsDisconnectionUseCase } from "../../use-cases/handle-ws-disconnection/handle-ws-disconnection.uc";
import {
  JoinLobbyOutputDto,
  type JoinLobbyInputDto,
} from "../../use-cases/join-lobby/join-lobby.dto";
import { JoinLobbyUseCase } from "../../use-cases/join-lobby/join-lobby.uc";
import { LeaveLobbyOutputDto } from "../../use-cases/leave-lobby/leave-lobby.dto";
import { LeaveLobbyUseCase } from "../../use-cases/leave-lobby/leave-lobby.uc";
import { ListenLobbiesUpdatesUseCase } from "../../use-cases/listen-lobbies-updates/listen-lobbies-updates.uc";
import { ListenLobbyUpdatesUseCase } from "../../use-cases/listen-lobby-updates/listen-lobby-updates.uc";
import { ListenLobbyChangesInputDto } from "../../use-cases/listen-lobby-updates/listen-lobby.updates.dto";
import { PickGameMasterInputDto } from "../../use-cases/pick-game-master/pick-game-master.dto";
import { PickGameMasterUseCase } from "../../use-cases/pick-game-master/pick-game-master.uc";
import type { PickHeroInputDto } from "../../use-cases/pick-hero/pick-hero.dto";
import { PickHeroUseCase } from "../../use-cases/pick-hero/pick-hero.uc";
import type { StartGameInputDto } from "../../use-cases/start-game/start-game.dto";
import { StartGameUseCase } from "../../use-cases/start-game/start-game.uc";
import type { TogglePlayerReadyStateInputDto } from "../../use-cases/toggle-player-ready-state/toggle-player-ready-state.dto";
import { TogglePlayerReadyStateUseCase } from "../../use-cases/toggle-player-ready-state/toggle-player-ready-state.uc";

@UseGuards(AuthGuard)
@UsePipes(ZodValidationPipe)
@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
  },
})
export class LobbySubscriberGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly handleWsConnectionUseCase: HandleWsConnectionUseCase,
    private readonly handleWsDisconnectionUseCase: HandleWsDisconnectionUseCase,
    private readonly joinLobbyUseCase: JoinLobbyUseCase,
    private readonly leaveLobbyUseCase: LeaveLobbyUseCase,
    private readonly listenLobbiesUpdatesUseCase: ListenLobbiesUpdatesUseCase,
    private readonly listenLobbyUpdatesUseCase: ListenLobbyUpdatesUseCase,
    private readonly pickHeroUseCase: PickHeroUseCase,
    private readonly discardHeroUseCase: DiscardHeroUseCase,
    private readonly togglePlayerReadyStateUseCase: TogglePlayerReadyStateUseCase,
    private readonly startGameUseCase: StartGameUseCase,
    private readonly pickGameMasterUseCase: PickGameMasterUseCase,
    private readonly discardGameMasterUseCase: DiscardGameMasterUseCase,
  ) {}

  public async handleConnection(client: ServerSocket) {
    await this.handleWsConnectionUseCase.execute({ client });
  }

  public async handleDisconnect(client: ServerSocket) {
    await this.handleWsDisconnectionUseCase.execute({ client });
  }

  @SubscribeMessage(ClientLobbyEvent.RequestCreateLobby)
  public async requestLobbyCreation(
    @MessageBody() createLobbyInputDto: CreateLobbyInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.eventEmitter.emitAsync(
      LobbyEvent.RequestCreateLobby,
      new RequestCreateLobbyPayload({
        config: createLobbyInputDto,
        stageId: createLobbyInputDto.stageId,
        userId: client.data.userId,
      }),
    );
  }

  @SubscribeMessage(ClientLobbyEvent.RequestJoinLobby)
  public async joinLobby(
    @MessageBody() joinLobbyDto: JoinLobbyInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await client.leave(LOBBIES_ROOM);
    const lobbyId = await this.joinLobbyUseCase.execute({
      userId: client.data.userId,
      ...joinLobbyDto,
    });
    await client.join(lobbyId);
    return JoinLobbyOutputDto.schema.parse({ lobbyId });
  }

  @SubscribeMessage(ClientLobbyEvent.ListenLobbiesChanges)
  public async listenLobbiesChanges(@ConnectedSocket() client: ServerSocket) {
    await this.listenLobbiesUpdatesUseCase.execute({ client });
    return { message: "You are now listening on lobbies changes" };
  }

  @SubscribeMessage(ClientLobbyEvent.ListenLobbyChanges)
  public async listenLobbyChanges(
    @MessageBody() listenLobbyChangesDto: ListenLobbyChangesInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.listenLobbyUpdatesUseCase.execute({
      ...listenLobbyChangesDto,
      client,
    });
  }

  @SubscribeMessage(ClientLobbyEvent.RequestLeaveLobby)
  public async leaveLobby(@ConnectedSocket() client: ServerSocket) {
    const lobbyId = await this.leaveLobbyUseCase.execute({
      userId: client.data.userId,
    });

    if (lobbyId) {
      await client.leave(lobbyId);
    }

    return LeaveLobbyOutputDto.schema.parse({ message: "Ok" });
  }

  @SubscribeMessage(ClientLobbyEvent.RequestPickHero)
  public async pickHero(
    @MessageBody() pickHeroDto: PickHeroInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.pickHeroUseCase.execute({
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
      userId: client.data.userId,
      ...startGameDto,
    });
  }

  @SubscribeMessage(ClientLobbyEvent.RequestPickGameMaster)
  public async pickGameMaster(
    @MessageBody() pickGameMasterDto: PickGameMasterInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.pickGameMasterUseCase.execute({
      userId: client.data.userId,
      ...pickGameMasterDto,
    });
  }

  @SubscribeMessage(ClientLobbyEvent.RequestDiscardGameMaster)
  public async discardGameMaster(
    @MessageBody() discardGameMasterDto: DiscardGameMasterInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.discardGameMasterUseCase.execute({
      userId: client.data.userId,
      ...discardGameMasterDto,
    });
  }
}
