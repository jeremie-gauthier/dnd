export enum LobbyEvent {
  LobbyChanged = "lobby.update.data",
  UserLeftLobby = "lobby.update.user_left",
  UserForceLeftLobby = "lobby.update.user_force_left",
  UserJoinedLobby = "lobby.update.user_joined",
  HostRequestedGameStart = "lobby.update.host_requested_game_start",
}
