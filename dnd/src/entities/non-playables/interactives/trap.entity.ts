import { Character } from '../../playables/characters/character.abstract';
import { Interactive } from './interactive.abstract';

export class Trap extends Interactive {
  public readonly name = 'Trap';
  public readonly isPlayable = false;
  public readonly isBlocking = false;
  public isVisible = false;
  public canInteract = true;

  public onInteraction(entity: Character) {
    console.log(entity.name, 'triggered a trap');
    entity.takeDirectDamage(1);
  }

  public getRepresentation() {
    return this.canInteract
      ? `This is a ${this.isVisible ? 'detected' : 'secret'} active Trap`
      : `This is a detected disarmed Trap`;
  }
}
