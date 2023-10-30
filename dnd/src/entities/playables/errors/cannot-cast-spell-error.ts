import type { CharacterClass } from '../../../interfaces/character-class.type';
import { PlayableEntityError } from './playable-entity-error';

export class CannotCastSpellError extends PlayableEntityError {
  constructor(characterClass: CharacterClass) {
    super(`Class ${characterClass} cannot cast spell`);
    this.name = 'CannotCastSpellError';
  }
}
