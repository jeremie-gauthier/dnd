import dedent from 'dedent-js';
import { AttackType } from '../../../interfaces/attack-type.enum';
import { CharacterClass } from '../../../interfaces/character-class.type';
import { Inventory } from '../../../inventory/inventory';
import type {
  Weapon,
  WeaponAttackResult,
} from '../../../items/weapons/weapon.abstract';
import { PlayableEntity } from '../playable.abstract';
import { Character } from './character.abstract';

export class Regdar extends Character {
  public readonly name = 'Regdar';
  public readonly description = dedent`
    Regdar est un champion du bien, qui a offert sa puissante épée à la cause de la justice.
    Il part à l'aventure pour combattre le mal, acquérir de nouvelles compétences et de l'expérience pour continuer sa croisade.
    Dans l'équipe d'aventuriers, Regdar doit principalement tuer les monstres et protéger ses équipiers.
  `;

  public readonly class: CharacterClass = 'warrior';
  public readonly level = 1;

  public readonly speed = 4;
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

  protected afterDiceRollsHook(
    attackResult: WeaponAttackResult,
    weapon: Weapon,
    _target: PlayableEntity,
  ): WeaponAttackResult {
    if (weapon.attackType === AttackType.Melee) {
      const [damages, ...rest] = attackResult;
      return [damages + 1, ...rest];
    } else {
      return attackResult;
    }
  }
}
