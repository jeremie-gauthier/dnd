import { Entity } from '../entity.abstract';
import type { Character } from '../playables/characters/character.abstract';
import { CannotInteractError } from './errors/cannot-interact-error';

export abstract class Interactive extends Entity {
  public abstract isVisible: boolean;
  public abstract isInteractive: boolean;

  public abstract onInteraction(entity: Character): void;

  public assertCanInteract(character: Character) {
    if (!this.isInteractive || !character.coord.isNextTo(this.coord)) {
      throw new CannotInteractError(character, this);
    }
  }
}
