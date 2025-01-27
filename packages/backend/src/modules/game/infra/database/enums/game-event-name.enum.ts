export const GameEventName = {
  ON_DOOR_OPENING: "on_door_opening",
} as const;

export const GameEventNameValues = Object.values(GameEventName);

export type GameEventNameType =
  (typeof GameEventName)[keyof typeof GameEventName];
