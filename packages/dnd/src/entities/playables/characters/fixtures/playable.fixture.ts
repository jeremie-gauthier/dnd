import { AttackResult } from '../../../../interfaces/attack-result.type';
import { CharacterClass } from '../../../../interfaces/character-class.type';
import { MOCK_INVENTORY_OPTIONS } from '../../../../inventory/fixtures/inventory.fixture';
import { Inventory } from '../../../../inventory/inventory';
import { Item } from '../../../../items/item.abstract';
import { PlayableEntity } from '../../playable.abstract';
import { Character } from '../character.abstract';

export const MOCK_CHARACTER_SPEED = 4;
export const MOCK_CHARACTER_HP = 10;
export const MOCK_CHARACTER_MANA = 10;
export const MOCK_CHARACTER_ARMOR_CLASS = 2;

export class MockSorcererCharacter extends Character {
  class: CharacterClass = 'sorcerer';
  level = 1;
  public name = 'mock_sorcerer_character_entity';
  description = 'Mock sorcerer character entity';
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

export class MockWarriorCharacter extends Character {
  class: CharacterClass = 'warrior';
  level = 1;
  public name = 'mock_warrior_character_entity';
  description = 'Mock warrior character entity';
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
