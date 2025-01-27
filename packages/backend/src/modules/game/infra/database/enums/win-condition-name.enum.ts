export const WinConditionName = {
  DEFEAT_ALL_MONSTERS: "defeat_all_monsters",
} as const;

export const WinConditionNameValues = Object.values(WinConditionName);

export type WinConditionNameType =
  (typeof WinConditionName)[keyof typeof WinConditionName];
