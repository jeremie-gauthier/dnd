import type { CharacterClass } from '../../../interfaces/character-class.type';
import { Item } from '../../../items/item.abstract';
import { PlayableEntity, PlayableEntityType } from '../playable.abstract';

export abstract class Character extends PlayableEntity {
  public readonly type = PlayableEntityType.Character;

  abstract readonly class: CharacterClass;
  abstract readonly level: number;
  abstract readonly initiative: number;

  public equip(item: Item): void {
    this.inventory.addItemInBag(item, this.inventory.equipped[item.type]);
  }

  public loot(item: Item): void {
    this.inventory.addItemInBag(item, this.inventory.backpack);
  }
}
