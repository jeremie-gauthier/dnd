export const ServerLobbyEvent = {
  LobbyChangesDetected: 'server.lobby.changes_detected',
  LobbiesChangesDetected: 'server.lobbies.changes_detected',
  LobbiesDeleted: 'server.lobbies.deleted',
  GameReady: 'server.lobby.game_is_ready',
  Error: 'server.lobby.error',
} as const;
