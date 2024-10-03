type ConditionName = "stopped" | "weakness" | "brokenArmor";

export type PlayableEntityCondition = {
  name: ConditionName;
  remainingTurns: number;
};
