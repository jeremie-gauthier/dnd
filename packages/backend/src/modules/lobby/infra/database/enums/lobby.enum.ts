export const LobbyViewStatus = {
  OPENED: "OPENED",
  GAME_INITIALIZING: "GAME_INITIALIZING",
  GAME_STARTED: "GAME_STARTED",
} as const;

export const LobbyViewStatusValues = Object.values(LobbyViewStatus);

export type LobbyViewStatusType =
  (typeof LobbyViewStatus)[keyof typeof LobbyViewStatus];
