type ConditionName =
  | "stopped"
  | "weakness"
  | "brokenArmor"
  | "doubleMovementPoints"
  | "trapProtection";

export type PlayableEntityCondition = {
  name: ConditionName;
  remainingTurns: number;
};
