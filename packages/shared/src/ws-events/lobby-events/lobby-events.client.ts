export const ClientLobbyEvent = {
  RequestCreateLobby: "client.lobby.request_create_lobby",
  RequestJoinLobby: "client.lobby.request_join_lobby",
  RequestLeaveLobby: "client.lobby.request_leave_lobby",
  ListenLobbiesChanges: "client.lobbies.listen_changes",
  ListenLobbyChanges: "client.lobby.listen_changes",
  RequestPickHero: "client.lobby.pick_hero",
  RequestDiscardHero: "client.lobby.discard_hero",
  RequestPickGameMaster: "client.lobby.pick_game_master",
  RequestDiscardGameMaster: "client.lobby.discard_game_master",
  RequestToggleReadyState: "client.lobby.toggle_ready_state",
  RequestStartLobby: "client.lobby.request_start_lobby",
} as const;
