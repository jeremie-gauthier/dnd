export const LobbyStatus = {
  OPENED: "OPENED",
  GAME_INITIALIZING: "GAME_INITIALIZING",
  GAME_STARTED: "GAME_STARTED",
} as const;

export const LobbyStatusValues = Object.values(LobbyStatus);

export type LobbyStatusType = (typeof LobbyStatus)[keyof typeof LobbyStatus];
