import { PlayableEntity } from '../playable.abstract';
import { PlayableEntityError } from './playable-entity-error';

export class NotInSightError extends PlayableEntityError {
  constructor(target: PlayableEntity) {
    super(`${target.name} is not in sight`);
    this.name = 'NotInSightError';
  }
}
