export enum LobbyEvent {
  DeleteLobby = "lobby.update.delete_lobby",
  GameReady = "lobby.update.game_ready",
  HostRequestedGameStart = "lobby.update.host_requested_game_start",
  LobbyChanged = "lobby.update.data",
  UserForceLeftLobby = "lobby.update.user_force_left",
  UserJoinedLobby = "lobby.update.user_joined",
  UserLeftLobby = "lobby.update.user_left",
}
