import { GameView, LobbyView, ServerLobbyEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { WsServer } from "src/interfaces/socket.interface";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { LOBBIES_ROOM } from "src/modules/lobby/shared/constants";
import { LobbyCreatedPayload } from "src/modules/shared/events/lobby/lobby-created.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { User } from "src/modules/user/infra/database/entities/user.entity";

@WebSocketGateway()
export class LobbyPublisherGateway {
  @WebSocketServer()
  private readonly server: WsServer;

  @OnEvent(LobbyEvent.UserJoinedLobby)
  @OnEvent(LobbyEvent.UserLeftLobby)
  protected lobbiesChangesHandler({ lobby }: { lobby: LobbyView }) {
    this.server.to(LOBBIES_ROOM).emit(ServerLobbyEvent.LobbiesChangesDetected, {
      lobby: {
        ...lobby,
        nbPlayers: lobby.players.length,
      },
    });
  }

  @OnEvent(LobbyEvent.LobbyDeleted)
  protected deleteLobbyHandler({ lobby }: { lobby: LobbyView }) {
    this.server
      .to(LOBBIES_ROOM)
      .emit(ServerLobbyEvent.LobbiesDeleted, { lobbyId: lobby.id });
  }

  @OnEvent(LobbyEvent.LobbyUpdated)
  protected lobbyChangesHandler({ lobby }: { lobby: LobbyView }) {
    this.server
      .to(lobby.id)
      .emit(ServerLobbyEvent.LobbyChangesDetected, { lobby });
  }

  @OnEvent(LobbyEvent.GameReady)
  protected gameReadyHandler({
    lobby,
    game,
  }: { lobby: Lobby; game: GameView }) {
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
    this.server.to(LOBBIES_ROOM).emit(ServerLobbyEvent.LobbiesChangesDetected, {
      lobby: {
        ...lobby,
        nbPlayers: lobby.players.length,
      },
    });
  }
}
