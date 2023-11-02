import { Chest } from '../../entities/non-playables/interactives/chest.entity';
import { Door } from '../../entities/non-playables/interactives/door.entity';
import { Character } from '../../entities/playables/characters/character.abstract';
import { Turn } from './turn.abstract';

export class CharacterTurn extends Turn {
  constructor(public readonly playableEntity: Character) {
    super();
  }

  public openDoor(door: Door) {
    console.log(`${this.playableEntity.name} opens a door`);
    this.takeAction(this._openDoor.bind(this), door);
  }

  public openChest(chest: Chest) {
    console.log(`${this.playableEntity.name} opens a chest`);
    this.takeAction(this._openChest.bind(this), chest);
  }

  public swapItems(...parameters: Parameters<CharacterTurn['_swapItems']>) {
    console.log(`${this.playableEntity.name} swapItems`);
    this.takeAction(this._swapItems.bind(this), ...parameters);
  }

  private _openDoor(door: Door) {
    door.onInteraction(this.playableEntity);
  }

  private _openChest(chest: Chest) {
    chest.onInteraction(this.playableEntity);
  }

  private _swapItems(
    ...parameters: Parameters<Character['inventory']['moveItem']>
  ) {
    this.playableEntity.inventory.moveItem(...parameters);
  }
}
