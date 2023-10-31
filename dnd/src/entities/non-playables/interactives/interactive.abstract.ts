import type { Character } from '../../playables/characters/character.abstract';
import { NonPlayable } from '../non-playable.abstract';
import { CannotInteractError } from './errors/cannot-interact-error';
import type { Trap } from './trap.entity';

export abstract class Interactive extends NonPlayable {
  public readonly type = 'interactive';
  public abstract isVisible: boolean;
  public abstract canInteract: boolean;

  public abstract onInteraction(entity: Character): void;

  public assertCanInteract(character: Character) {
    if (!this.canInteract || !character.coord.isNextTo(this.coord)) {
      throw new CannotInteractError(character, this);
    }
  }

  public isTrap(): this is Trap {
    return this.name === 'Trap';
  }
}
