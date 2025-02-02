export const GameEventAction = {
  SPAWN_MONSTERS: "spawn_monsters",
} as const;

export const GameEventActionValues = Object.values(GameEventAction);

export type GameEventActionType =
  (typeof GameEventAction)[keyof typeof GameEventAction];
