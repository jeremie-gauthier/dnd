export const ClientLobbyEvent = {
  RequestCreateLobby: "client.lobby.request_create_lobby",
  RequestJoinLobby: "client.lobby.request_join_lobby",
  RequestLeaveLobby: "client.lobby.request_leave_lobby",
  ListenLobbiesChanges: "client.lobbies.listen_changes",
  ListenLobbyChanges: "client.lobby.listen_changes",
  RequestPickPlayableCharacter: "client.lobby.pick_playable_character",
  RequestDiscardPlayableCharacter: "client.lobby.discard_playable_character",
  RequestToggleReadyState: "client.lobby.toggle_ready_state",
  RequestStartLobby: "client.lobby.request_start_lobby",
} as const;
