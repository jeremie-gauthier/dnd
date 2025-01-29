export const PlayerStatus = {
  PREPARATION: "preparation",
  IDLE: "idle",
  ACTION: "action",
} as const;

export const PlayerStatusValues = Object.values(PlayerStatus);

export type PlayerStatusType = (typeof PlayerStatus)[keyof typeof PlayerStatus];
