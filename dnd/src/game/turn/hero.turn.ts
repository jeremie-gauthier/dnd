import { Character } from '../../entities/playables/characters/character.abstract';
import { PlayableEntity } from '../../entities/playables/playable.abstract';
import { Item } from '../../items/item.abstract';
import { Turn } from './turn.abstract';

export class HeroTurn extends Turn {
  public actionPoints = 2;

  constructor(protected readonly playableEntity: Character) {
    super();
  }

  public move() {
    throw new Error('Not implemented.');
  }

  public openDoor() {
    throw new Error('Not implemented.');
  }

  public attack(...parameters: Parameters<HeroTurn['_attack']>) {
    console.log(`${this.playableEntity.name} attack`);
    this.takeAction(this._attack.bind(this), ...parameters);
  }

  public openChest() {
    throw new Error('Not implemented.');
  }

  public swapItems(backpackItem: Item, equippedItem: Item) {
    console.log(`${this.playableEntity.name} swapItems`);
    this.playableEntity.inventory.moveItem({ backpackItem, equippedItem });
  }

  private takeAction<ActionMethod extends (...parameters: any[]) => void>(
    action: ActionMethod,
    ...parameters: Parameters<ActionMethod>
  ) {
    try {
      if (this.actionPoints <= 0) {
        throw new Error('[-] Not enough action points');
      }

      this.actionPoints -= 1;
      action(...parameters);
    } catch (error) {
      this.actionPoints += 1;
      console.error(error);
    }
  }

  private _attack(...parameters: Parameters<PlayableEntity['attack']>) {
    this.playableEntity.attack(...parameters);
  }
}
