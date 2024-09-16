import { ClientLobbyEvent } from "@dnd/shared";
import { UseFilters, UsePipes } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import {
  ConnectedSocket,
  MessageBody,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { ZodValidationPipe } from "nestjs-zod";
import { WsExceptionFilter } from "src/errors/ws-exception-filter";
import type { ServerSocket } from "src/interfaces/socket.interface";
import { DiscardPlayableCharacterInputDto } from "src/modules/lobby/application/use-cases/discard-playable-character/discard-playable-character.dto";
import { DiscardPlayableCharacterUseCase } from "src/modules/lobby/application/use-cases/discard-playable-character/discard-playable-character.uc";
import { PickPlayableCharacterInputDto } from "src/modules/lobby/application/use-cases/pick-playable-character/pick-playable-character.dto";
import { PickPlayableCharacterUseCase } from "src/modules/lobby/application/use-cases/pick-playable-character/pick-playable-character.uc";
import { LOBBIES_ROOM } from "src/modules/lobby/shared/constants";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { RequestCreateLobbyPayload } from "src/modules/shared/events/lobby/request-create-lobby.payload";
import { type CreateLobbyInputDto } from "../../../application/use-cases/create-lobby/create-lobby.dto";
import { HandleWsConnectionUseCase } from "../../../application/use-cases/handle-ws-connection/handle-ws-connection.uc";
import { HandleWsDisconnectionUseCase } from "../../../application/use-cases/handle-ws-disconnection/handle-ws-disconnection.uc";
import {
  type JoinLobbyInputDto,
  JoinLobbyOutputDto,
} from "../../../application/use-cases/join-lobby/join-lobby.dto";
import { JoinLobbyUseCase } from "../../../application/use-cases/join-lobby/join-lobby.uc";
import { LeaveLobbyOutputDto } from "../../../application/use-cases/leave-lobby/leave-lobby.dto";
import { LeaveLobbyUseCase } from "../../../application/use-cases/leave-lobby/leave-lobby.uc";
import { ListenLobbiesUpdatesUseCase } from "../../../application/use-cases/listen-lobbies-updates/listen-lobbies-updates.uc";
import { ListenLobbyUpdatesUseCase } from "../../../application/use-cases/listen-lobby-updates/listen-lobby-updates.uc";
import { ListenLobbyChangesInputDto } from "../../../application/use-cases/listen-lobby-updates/listen-lobby.updates.dto";
import type { StartGameInputDto } from "../../../application/use-cases/start-game/start-game.dto";
import { StartGameUseCase } from "../../../application/use-cases/start-game/start-game.uc";
import type { TogglePlayerReadyStateInputDto } from "../../../application/use-cases/toggle-player-ready-state/toggle-player-ready-state.dto";
import { TogglePlayerReadyStateUseCase } from "../../../application/use-cases/toggle-player-ready-state/toggle-player-ready-state.uc";

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
    private readonly pickPlayableCharacterUseCase: PickPlayableCharacterUseCase,
    private readonly discardPlayableCharacterUseCase: DiscardPlayableCharacterUseCase,
    private readonly togglePlayerReadyStateUseCase: TogglePlayerReadyStateUseCase,
    private readonly startGameUseCase: StartGameUseCase,
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

  @SubscribeMessage(ClientLobbyEvent.RequestPickPlayableCharacter)
  public async pickPlayableCharacter(
    @MessageBody() pickPlayableCharacterDto: PickPlayableCharacterInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.pickPlayableCharacterUseCase.execute({
      userId: client.data.userId,
      ...pickPlayableCharacterDto,
    });
  }

  @SubscribeMessage(ClientLobbyEvent.RequestDiscardPlayableCharacter)
  public async discardPlayableCharacter(
    @MessageBody()
    discardPlayableCharacterDto: DiscardPlayableCharacterInputDto,
    @ConnectedSocket() client: ServerSocket,
  ) {
    await this.discardPlayableCharacterUseCase.execute({
      userId: client.data.userId,
      ...discardPlayableCharacterDto,
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
}
