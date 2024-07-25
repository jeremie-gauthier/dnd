import { BehaviourDefender } from "./behaviour-defender.interface";

export class BehaviourDefenderMonster implements BehaviourDefender {
  public getDamagesInflictedResult({
    rawDamages,
    characteristic,
  }: {
    rawDamages: number;
    characteristic: {
      baseHealthPoints: number;
      healthPoints: number;
      baseManaPoints: number;
      manaPoints: number;
      baseArmorClass: number;
      armorClass: number;
      baseMovementPoints: number;
      movementPoints: number;
      baseActionPoints: number;
      actionPoints: number;
    };
  }): {
    damageTaken: number;
  } {
    const damageTaken = Math.max(0, rawDamages - characteristic.armorClass);
    return { damageTaken };
  }
}
