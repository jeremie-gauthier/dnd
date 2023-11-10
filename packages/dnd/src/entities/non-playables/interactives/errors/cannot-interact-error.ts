import { Character } from '../../../playables/characters/character.abstract';
import { Interactive } from '../interactive.abstract';
import { InteractiveEntityError } from './interactive-entity-error';

export class CannotInteractError extends InteractiveEntityError {
  constructor(character: Character, interactiveEntity: Interactive) {
    super(`${character.name} cannot interact with ${interactiveEntity.name}`);
    this.name = 'CannotInteractError';
  }
}
