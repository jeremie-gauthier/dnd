import type { Coord } from '../../map/coord';
import { Character } from '../playables/characters/character.abstract';
import { Interactive } from './interactive.interface';

export class Door implements Interactive {
  public readonly type = 'door';
  public readonly isPlayable = false;
  public isBlocking = true;
  public isVisible = true;
  public canInteract = true;

  constructor(public readonly coord: Coord) {}

  public onInteraction(entity: Character) {
    console.log(entity.name, 'opened a door');
    this.isBlocking = false;
    // TODO: redistribuer les initiatives
  }

  public getRepresentation() {
    return `This is a Door`;
  }

  public toString() {
    return 'D';
  }
}
