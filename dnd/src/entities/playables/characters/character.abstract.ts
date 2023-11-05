import type {
  CharacterClass,
  SpellCaster,
} from '../../../interfaces/character-class.type';
import { Item } from '../../../items/item.abstract';
import { PlayableEntity, PlayableEntityType } from '../playable.abstract';

export abstract class Character extends PlayableEntity {
  public readonly type = PlayableEntityType.Character;

  abstract readonly class: CharacterClass;
  abstract readonly level: number;

  public equip(item: Item): void {
    this.inventory.addItemInBag(item, this.inventory.equipped[item.type]);
  }

  public loot(item: Item): void {
    this.inventory.addItemInBag(item, this.inventory.backpack);
  }

  public isSpellCaster(): this is this & { class: SpellCaster } {
    const spellCasters: SpellCaster[] = ['cleric', 'sorcerer'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return spellCasters.includes(this.class as any);
  }
}
