export const InteractiveEntityKind = {
  DOOR: "door",
  TRAP: "trap",
  CHEST: "chest",
} as const;

export const InteractiveEntityKindValues = Object.values(InteractiveEntityKind);

export type InteractiveEntityKindType =
  (typeof InteractiveEntityKind)[keyof typeof InteractiveEntityKind];
