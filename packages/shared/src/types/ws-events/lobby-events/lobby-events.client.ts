export const ClientLobbyEvent = {
  RequestCreateLobby: 'client.lobby.request_create_lobby',
  RequestJoinLobby: 'client.lobby.request_join_lobby',
  RequestLeaveLobby: 'client.lobby.request_leave_lobby',
  ListenLobbiesChanges: 'client.lobbies.listen_changes',
  RequestPickHero: 'client.lobby.pick_hero',
  RequestDiscardHero: 'client.lobby.discard_hero',
  RequestToggleReadyState: 'client.lobby.toggle_ready_state',
} as const;
