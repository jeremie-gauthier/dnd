import { AttackResult } from '../../../interfaces/attack-result.type';
import { MOCK_INVENTORY_OPTIONS } from '../../../inventory/fixtures/inventory.fixture';
import { Inventory } from '../../../inventory/inventory';
import { Item } from '../../../items/item.abstract';
import { PlayableEntity, PlayableEntityType } from '../playable.abstract';

export const MOCK_CHARACTER_SPEED = 4;
export const MOCK_CHARACTER_HP = 10;
export const MOCK_CHARACTER_MANA = 10;
export const MOCK_CHARACTER_ARMOR_CLASS = 2;

export class MockCharacterEntity extends PlayableEntity {
  public name = 'mock_character_entity';
  type: PlayableEntityType = PlayableEntityType.Character;
  description = 'Mock character entity';
  speed = MOCK_CHARACTER_SPEED;
  healthPoints = MOCK_CHARACTER_HP;
  healthPointsNatural = MOCK_CHARACTER_HP;
  manaPoints = MOCK_CHARACTER_MANA;
  manaPointsNatural = MOCK_CHARACTER_MANA;
  armorClass = MOCK_CHARACTER_ARMOR_CLASS;
  armorClassNatural = MOCK_CHARACTER_ARMOR_CLASS;
  inventory: Inventory = new Inventory(MOCK_INVENTORY_OPTIONS);

  protected afterDiceRollsHook(
    attackResult: AttackResult,
    _item: Item,
    _target: PlayableEntity,
  ): AttackResult {
    return attackResult;
  }
}

export const MOCK_DAMAGES = 4;
export const MOCK_DAMAGES_AFTER_ARMOR_CLASS =
  MOCK_DAMAGES - MOCK_CHARACTER_ARMOR_CLASS;
export const HP_LEFT_AFTER_ONE_ATTACK_WITH_ARMOR_CLASS =
  MOCK_CHARACTER_HP - MOCK_DAMAGES_AFTER_ARMOR_CLASS;
export const HP_LEFT_AFTER_ONE_ATTACK_WITHOUT_ARMOR_CLASS =
  MOCK_CHARACTER_HP - MOCK_DAMAGES;

export const MOCK_ENEMY_SPEED = 4;
export const MOCK_ENEMY_HP = 4;
export const MOCK_ENEMY_MANA = 5;
export const MOCK_ENEMY_ARMOR_CLASS = 1;

export class MockEnemyEntity extends PlayableEntity {
  public name = 'mock_enemy_entity';
  type: PlayableEntityType = PlayableEntityType.Enemy;
  description = 'Mock enemy entity';
  speed = MOCK_ENEMY_SPEED;
  healthPoints = MOCK_ENEMY_HP;
  healthPointsNatural = MOCK_ENEMY_HP;
  manaPoints = MOCK_ENEMY_MANA;
  manaPointsNatural = MOCK_ENEMY_MANA;
  armorClass = MOCK_ENEMY_ARMOR_CLASS;
  armorClassNatural = MOCK_ENEMY_ARMOR_CLASS;
  inventory: Inventory = new Inventory(MOCK_INVENTORY_OPTIONS);

  protected afterDiceRollsHook(
    attackResult: AttackResult,
    _item: Item,
    _target: PlayableEntity,
  ): AttackResult {
    return attackResult;
  }
}
