export const GameStatus = {
  PREPARE_FOR_BATTLE: "PREPARE_FOR_BATTLE",
  BATTLE_ONGOING: "BATTLE_ONGOING",
} as const;

export const GameStatusValues = Object.values(GameStatus);

export type GameStatusType = (typeof GameStatus)[keyof typeof GameStatus];
