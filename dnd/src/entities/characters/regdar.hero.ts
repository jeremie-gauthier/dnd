import type { Weapon } from '../../weapons/weapon.interface';
import { AttackResult, Character } from './character.abstract';

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

  protected afterAttack(
    weapon: Weapon,
    attackResult: AttackResult,
  ): AttackResult {
    if (weapon.type === 'melee') {
      const [damages, ...rest] = attackResult;
      return [damages + 1, ...rest];
    } else {
      return attackResult;
    }
  }
}
