export enum LobbyEvent {
  LobbyCreated = "lobby.request.lobby_created",
  RequestCreateLobby = "lobby.request.create_lobby",
  LobbyDeleted = "lobby.update.lobby_deleted",
  GameReady = "lobby.update.game_ready",
  HostRequestedGameStart = "lobby.update.host_requested_game_start",
  LobbyUpdated = "lobby.update.data_updated",
  UserJoinedLobby = "lobby.update.user_joined",
  UserLeftLobby = "lobby.update.user_left",
}
