import { PlayableEntityError } from './playable-entity-error';

export class InvalidPathError extends PlayableEntityError {
  constructor() {
    super(`Path is not valid`);
    this.name = 'InvalidPathError';
  }
}
