import { PlayableEntityError } from './playable-entity-error';

export class CannotRangeAttackError extends PlayableEntityError {
  constructor() {
    super(
      `Player must not be adjacent to the target to perform a range attack`,
    );
    this.name = 'CannotRangeAttackError';
  }
}
