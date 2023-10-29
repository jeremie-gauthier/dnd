import dedent from 'dedent-js';
import { Inventory } from '../../../inventory/inventory';
import { GoblinMace } from '../../../items/weapons/goblin-mace.weapon';
import {
  Weapon,
  WeaponAttackResult,
} from '../../../items/weapons/weapon.abstract';
import type { Coord } from '../../../map/coord';
import { PlayableEntity } from '../playable.abstract';
import { Enemy } from './enemy.abstract';

export class Goblin extends Enemy {
  public readonly name = 'Goblin';
  public readonly description = dedent`
    Les gobelins sont des humanoïdes de petite taille que beaucoup considèrent comme des parasites.
    Cependant, ils peuvent être dangereux quand ils sont en groupe.
  `;

  constructor(coord: Coord) {
    super(coord);
    this.inventory.addItemInBag(
      new GoblinMace(),
      this.inventory.equipped.weapon,
    );
  }

  public readonly speed = 5;
  public healthPoints = 4;
  public readonly healthPointsNatural = 4;
  public manaPoints = 0;
  public readonly manaPointsNatural = 0;
  public armorClass = 1;
  public readonly armorClassNatural = 1;
  public readonly inventory = new Inventory({
    backpackSlots: 0,
    equipped: {
      artifactSlots: 0,
      spellSlots: 0,
      weaponSlots: 1,
    },
  });

  protected afterDiceRollsHook(
    attackResult: WeaponAttackResult,
    _weapon: Weapon,
    _target: PlayableEntity,
  ): WeaponAttackResult {
    return attackResult;
  }
}
