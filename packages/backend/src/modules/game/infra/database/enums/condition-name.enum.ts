export const ConditionName = {
  STOPPED: "stopped",
  WEAKNESS: "weakness",
  BROKENARMOR: "brokenArmor",
  DOUBLEMOVEMENTPOINTS: "doubleMovementPoints",
  TRAPPROTECTION: "trapProtection",
  DOUBLEWEAPONDAMAGE: "doubleWeaponDamage",
} as const;

export const ConditionNameValues = Object.values(ConditionName);

export type ConditionNameType =
  (typeof ConditionName)[keyof typeof ConditionName];
