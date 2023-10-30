import { Character } from '../playables/characters/character.abstract';
import { Interactive } from './interactive.abstract';

export class Trap extends Interactive {
  public readonly name = 'Trap';
  public readonly type = 'trap';
  public readonly isPlayable = false;
  public readonly isBlocking = false;
  public isVisible = false;
  public isInteractive = true;

  public onInteraction(entity: Character) {
    console.log(entity.name, 'triggered a trap');
    entity.takeDirectDamage(1);
  }

  public getRepresentation() {
    return this.isInteractive
      ? `This is a ${this.isVisible ? 'detected' : 'secret'} active Trap`
      : `This is a detected disarmed Trap`;
  }

  public toString() {
    return 'T';
  }
}
