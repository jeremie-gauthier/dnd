type ConditionName =
  | "stopped"
  | "weakness"
  | "brokenArmor"
  | "doubleMovementPoints";

export type PlayableEntityCondition = {
  name: ConditionName;
  remainingTurns: number;
};
