export enum LobbyEvent {
  LobbyCreated = "lobby.request.lobby_created",
  RequestCreateLobby = "lobby.request.create_lobby",
  DeleteLobby = "lobby.update.delete_lobby",
  GameReady = "lobby.update.game_ready",
  HostRequestedGameStart = "lobby.update.host_requested_game_start",
  LobbyUpdated = "lobby.update.data_updated",
  UserJoinedLobby = "lobby.update.user_joined",
  UserLeftLobby = "lobby.update.user_left",
}
