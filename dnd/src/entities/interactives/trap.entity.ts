import { Character } from '../characters/character.interface';
import { Interactive } from './interactive.interface';

export class Trap implements Interactive {
  public readonly type = 'trap';
  public isVisible = false;
  public canInteract = true;

  public onInteraction(entity: Character) {
    entity.setHP(entity.getHP() - 1);
  }

  public getRepresentation() {
    return this.canInteract
      ? `This is a ${this.isVisible ? 'detected' : 'secret'} active Trap`
      : `This is a detected disarmed Trap`;
  }
}
