import { ClientLobbyEvent } from "@dnd/shared";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
} from "@nestjs/websockets";
import { ZodValidationPipe } from "nestjs-zod";
import { JWTAuthGuard } from "src/authz/jwt-auth.guard";
import { WsExceptionFilter } from "src/errors/ws-exception-filter";
import type { ServerSocket } from "src/types/socket.type";
import { LOBBIES_ROOM } from "./constants";
import {
  CreateLobbyOutputDto,
  type CreateLobbyInputDto,
} from "./create-lobby/create-lobby.dto";
import { CreateLobbyUseCase } from "./create-lobby/create-lobby.uc";
import { DiscardGameMasterInputDto } from "./discard-game-master/discard-game-master.dto";
import { DiscardGameMasterUseCase } from "./discard-game-master/discard-game-master.uc";
import type { DiscardHeroInputDto } from "./discard-hero/discard-hero.dto";
import { DiscardHeroUseCase } from "./discard-hero/discard-hero.uc";
import { HandleWsConnectionUseCase } from "./handle-ws-connection/handle-ws-connection.uc";
import { HandleWsDisconnectionUseCase } from "./handle-ws-disconnection/handle-ws-disconnection.uc";
import {
  JoinLobbyOutputDto,
  type JoinLobbyInputDto,
} from "./join-lobby/join-lobby.dto";
import { JoinLobbyUseCase } from "./join-lobby/join-lobby.uc";
import { LeaveLobbyOutputDto } from "./leave-lobby/leave-lobby.dto";
import { LeaveLobbyUseCase } from "./leave-lobby/leave-lobby.uc";
import { ListenLobbiesChangesUseCase } from "./listen-lobbies-changes/listen-lobbies-changes.uc";
import { PickGameMasterInputDto } from "./pick-game-master/pick-game-master.dto";
import { PickGameMasterUseCase } from "./pick-game-master/pick-game-master.uc";
import type { PickHeroInputDto } from "./pick-hero/pick-hero.dto";
import { PickHeroUseCase } from "./pick-hero/pick-hero.uc";
import type { StartGameInputDto } from "./start-game/start-game.dto";
import { StartGameUseCase } from "./start-game/start-game.uc";
import type { TogglePlayerReadyStateInputDto } from "./toggle-player-ready-state/toggle-player-ready-state.dto";
import { TogglePlayerReadyStateUseCase } from "./toggle-player-ready-state/toggle-player-ready-state.uc";

@UseGuards(JWTAuthGuard)
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
    private readonly pickGameMasterUseCase: PickGameMasterUseCase,
    private readonly discardGameMasterUseCase: DiscardGameMasterUseCase,
  ) {}

  public async handleConnection(client: ServerSocket) {
    await this.handleWsConnectionUseCase.execute(client);
  }

  public async handleDisconnect(client: ServerSocket) {
    await this.handleWsDisconnectionUseCase.execute(client);
  }

  @SubscribeMessage(ClientLobbyEvent.RequestCreateLobby)
  public async requestLobbyCreation(
    @MessageBody() createLobbyInputDto: CreateLobbyInputDto,
    @ConnectedSocket() client: ServerSocket,
  ): Promise<CreateLobbyOutputDto> {
    const lobby = await this.createLobbyUseCase.execute({
      userId: client.data.userId,
      createLobbyInputDto,
    });

    await client.join(lobby.id);

    return CreateLobbyOutputDto.schema.parse(lobby);
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
    await this.listenLobbiesChangesUseCase.execute(client);
    return { message: "You are now listening on lobbies changes" };
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
