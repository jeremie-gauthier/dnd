import { GameEntity, LobbyEntity, ServerLobbyEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { User } from "src/database/entities/user.entity";
import { WsServer } from "src/interfaces/socket.interface";
import { LobbyCreatedPayload } from "../../events/lobby-created.payload";
import { LobbyEvent } from "../../events/lobby-event.enum";
import { LOBBIES_ROOM } from "../../shared/constants";

@WebSocketGateway()
export class LobbyPublisherGateway {
  @WebSocketServer()
  private readonly server: WsServer;

  @OnEvent(LobbyEvent.UserJoinedLobby)
  @OnEvent(LobbyEvent.UserLeftLobby)
  protected lobbiesChangesHandler({ lobby }: { lobby: LobbyEntity }) {
    this.server.to(LOBBIES_ROOM).emit(ServerLobbyEvent.LobbiesChangesDetected, {
      lobby: {
        ...lobby,
        nbPlayers: lobby.players.length,
      },
    });
  }

  @OnEvent(LobbyEvent.LobbyDeleted)
  protected deleteLobbyHandler({ lobby }: { lobby: LobbyEntity }) {
    this.server
      .to(LOBBIES_ROOM)
      .emit(ServerLobbyEvent.LobbiesDeleted, { lobbyId: lobby.id });
  }

  @OnEvent(LobbyEvent.LobbyUpdated)
  protected lobbyChangesHandler({ lobby }: { lobby: LobbyEntity }) {
    this.server
      .to(lobby.id)
      .emit(ServerLobbyEvent.LobbyChangesDetected, { lobby });
  }

  @OnEvent(LobbyEvent.GameReady)
  protected gameReadyHandler({
    lobby,
    game,
  }: { lobby: LobbyEntity; game: GameEntity }) {
    this.server
      .to(lobby.id)
      .emit(ServerLobbyEvent.GameInitializationDone, { game });
  }

  @OnEvent(LobbyEvent.UserLeftLobby)
  protected userLeftLobby({ userId }: { userId: User["id"] }) {
    this.server.to(userId).emit(ServerLobbyEvent.UserLeftLobby);
  }

  @OnEvent(LobbyEvent.LobbyCreated)
  protected async lobbyCreated({ lobby, userId }: LobbyCreatedPayload) {
    const sockets = await this.server.fetchSockets();
    const clientSocket = sockets.find(({ data }) => data.userId === userId);
    if (clientSocket) {
      clientSocket.join(lobby.id);
      this.server.to(userId).emit(ServerLobbyEvent.LobbyCreated, { lobby });
    }
  }
}
