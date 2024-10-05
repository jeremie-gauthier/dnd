type ConditionName =
  | "stopped"
  | "weakness"
  | "brokenArmor"
  | "doubleMovementPoints"
  | "trapProtection"
  | "doubleWeaponDamage";

export type PlayableEntityCondition = {
  name: ConditionName;
  remainingTurns: number;
};
