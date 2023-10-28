import { Item } from '../../../items/item.abstract';
import { PlayableEntityError } from './playable-entity-error';

export class NotEquippedError extends PlayableEntityError {
  constructor(item: Item) {
    super(
      `${item.name} (${item.type}) must be equipped to be used for an attack`,
    );
    this.name = 'NotEquippedError';
  }
}
