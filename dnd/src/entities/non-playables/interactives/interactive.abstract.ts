import type { Character } from '../../playables/characters/character.abstract';
import { NonPlayable } from '../non-playable.abstract';
import { CannotInteractError } from './errors/cannot-interact-error';

export abstract class Interactive extends NonPlayable {
  public abstract isVisible: boolean;
  public abstract isInteractive: boolean;

  public abstract onInteraction(entity: Character): void;

  public assertCanInteract(character: Character) {
    if (!this.isInteractive || !character.coord.isNextTo(this.coord)) {
      throw new CannotInteractError(character, this);
    }
  }
}
