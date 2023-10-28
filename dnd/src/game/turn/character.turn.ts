import { Character } from '../../entities/playables/characters/character.abstract';
import { Turn } from './turn.abstract';

export class CharacterTurn extends Turn {
  public actionPoints = 2;

  constructor(protected readonly playableEntity: Character) {
    super();
  }

  public openDoor() {
    throw new Error('Not implemented.');
  }

  public openChest() {
    throw new Error('Not implemented.');
  }

  public swapItems(...parameters: Parameters<CharacterTurn['_swapItems']>) {
    console.log(`${this.playableEntity.name} swapItems`);
    this.takeAction(this._swapItems.bind(this), ...parameters);
  }

  private _swapItems(
    ...parameters: Parameters<Character['inventory']['moveItem']>
  ) {
    this.playableEntity.inventory.moveItem(...parameters);
  }
}
