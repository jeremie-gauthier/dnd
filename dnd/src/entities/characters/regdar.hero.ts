import type { DiceRoll } from '../../dices/dice.interface';
import { sum } from '../../utils/sum';
import type { Weapon } from '../../weapons/weapon.interface';
import { Character } from './character.abstract';

export class Regdar extends Character {
  public readonly name = 'Regdar';

  public readonly level = 1;
  public readonly speed = 4;
  public readonly initiative = 0;
  public healthPoints = 8;
  public readonly healthPointsNatural = 8;
  public manaPoints = 0;
  public readonly manaPointsNatural = 0;
  public armorClass = 2;
  public readonly armorClassNatural = 2;

  public attack(weapon: Weapon): [number, DiceRoll[]] {
    const diceRolls = weapon.rollAttack();
    const sumDiceRolls = sum(
      ...diceRolls
        .filter(({ type }) => type === 'attack')
        .map(({ value }) => value),
    );

    const passiveBonus = weapon.type === 'melee' ? 1 : 0;

    return [sumDiceRolls + passiveBonus, diceRolls];
  }
}
