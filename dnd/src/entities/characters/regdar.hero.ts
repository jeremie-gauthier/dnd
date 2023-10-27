import { AttackType } from '../../interfaces/attack-type.enum';
import { CharacterClass } from '../../interfaces/character-class.type';
import { Inventory } from '../../inventory/inventory';
import type { Weapon } from '../../weapons/weapon.abstract';
import { Character, type AttackResult } from './character.abstract';

export class Regdar extends Character {
  public readonly name = 'Regdar';

  public readonly class: CharacterClass = 'warrior';
  public readonly level = 1;
  public readonly speed = 4;
  public readonly initiative = 0;
  public healthPoints = 8;
  public readonly healthPointsNatural = 8;
  public manaPoints = 0;
  public readonly manaPointsNatural = 0;
  public armorClass = 2;
  public readonly armorClassNatural = 2;
  public readonly inventory = new Inventory({
    backpackSlots: 4,
    equipped: {
      artifactSlots: 1,
      spellSlots: 0,
      weaponSlots: 2,
    },
  });

  protected getAttackWithModifiers(
    weapon: Weapon,
    attackResult: AttackResult,
  ): AttackResult {
    if (weapon.attackType === AttackType.Melee) {
      const [damages, ...rest] = attackResult;
      return [damages + 1, ...rest];
    } else {
      return attackResult;
    }
  }
}
