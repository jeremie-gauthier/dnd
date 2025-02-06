export const AttackRange = {
  MELEE: "melee",
  LONG: "long",
  VERSATILE: "versatile",
} as const;

export const AttackRangeValues = Object.values(AttackRange);

export type AttackRangeType = (typeof AttackRange)[keyof typeof AttackRange];
