import { Character } from '../characters/character.interface';
import { Interactive } from './interactive.interface';

export class Door implements Interactive {
  public readonly type = 'door';
  public isVisible = true;
  public canInteract = true;

  public onInteraction(entity: Character) {
    console.log(entity.getName(), 'opened a door');
  }

  public getRepresentation() {
    return `This is a Door`;
  }

  public toString() {
    return 'D';
  }
}
