import { GameEntity, LobbyEntity, ServerLobbyEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { User } from "src/database/entities/user.entity";
import { WsServer } from "src/interfaces/socket.interface";
import { GameEvent } from "src/modules/game/events/emitters/game-event.enum";
import { LOBBIES_ROOM } from "./constants";
import { LobbyEvent } from "./events/emitters/lobby-event.enum";

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

  @OnEvent(LobbyEvent.DeleteLobby)
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

  @OnEvent(GameEvent.GameInitializationStarted)
  protected gameInitializationStartedHandler({
    lobby,
  }: { lobby: LobbyEntity }) {
    this.server.to(lobby.id).emit(ServerLobbyEvent.GameInitializationStarted);
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
    console.log("publish ServerLobbyEvent.UserLeftLobby");
    this.server.to(userId).emit(ServerLobbyEvent.UserLeftLobby);
  }
}
