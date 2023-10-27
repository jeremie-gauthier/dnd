import { Character } from '../characters/character.abstract';
import { Interactive } from './interactive.interface';

export class Chest implements Interactive {
  public readonly type = 'chest';
  public readonly isBlocking = true;
  public isVisible = true;
  public canInteract = true;

  public onInteraction(entity: Character) {
    console.log(entity.name, 'opened a chest');
  }

  public getRepresentation() {
    return `This is a Chest`;
  }

  public toString() {
    return 'C';
  }
}
