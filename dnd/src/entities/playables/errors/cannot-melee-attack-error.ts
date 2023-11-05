import { PlayableEntityError } from './playable-entity-error';

export class CannotMeleeAttackError extends PlayableEntityError {
  constructor() {
    super(`Player must be adjacent to the target to perform a melee attack`);
    this.name = 'CannotMeleeAttackError';
  }
}
