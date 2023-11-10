import { PlayableEntityError } from './playable-entity-error';

export class NotACharacterError extends PlayableEntityError {
  constructor() {
    super(`Entity is not a character`);
    this.name = 'NotACharacterError';
  }
}
