export interface BehaviourDefender {
  getDamagesInflictedResult(_: {
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
  };
}
