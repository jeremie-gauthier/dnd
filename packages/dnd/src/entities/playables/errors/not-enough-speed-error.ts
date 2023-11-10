import { PlayableEntityError } from './playable-entity-error';

export class NotEnoughSpeedError extends PlayableEntityError {
  constructor() {
    super(`Not enough speed to reach this tile`);
    this.name = 'NotEnoughSpeedError';
  }
}
