import { GameEntity, LobbyEntity, ServerLobbyEvent } from "@dnd/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { WsServer } from "src/types/socket.type";
import { LOBBIES_ROOM } from "./constants";
import { LobbyEvent } from "./events/emitters/lobby-events.enum";

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
}
