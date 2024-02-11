export const LobbyEntityStatus = {
  OPENED: 'OPENED',
  GAME_STARTED: 'GAME_STARTED',
} as const;

export const LobbyEntityStatusValues = Object.values(LobbyEntityStatus);

export type LobbyEntityStatusType = (typeof LobbyEntityStatus)[keyof typeof LobbyEntityStatus];
