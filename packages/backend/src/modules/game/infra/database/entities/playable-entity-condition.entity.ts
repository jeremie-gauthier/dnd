type ConditionName =
  | "stopped"
  | "weakness"
  | "brokenArmor"
  | "doubleMovementPoints"
  | "trapProtection"
  | "doubleWeaponDamage";

export class PlayableEntityCondition {
  name: ConditionName;
  remainingTurns: number;
}
