export const AttackType = {
  REGULAR: "regular",
  SUPER: "super",
} as const;

export const AttackTypeValues = Object.values(AttackType);

export type AttackTypeType = (typeof AttackType)[keyof typeof AttackType];
