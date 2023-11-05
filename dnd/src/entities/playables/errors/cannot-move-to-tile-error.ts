import { PlayableEntityError } from './playable-entity-error';

export class CannotMoveToTileError extends PlayableEntityError {
  constructor() {
    super(`Cannot move to this tile`);
    this.name = 'CannotMoveToTileError';
  }
}
