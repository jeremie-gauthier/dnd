import type { Item } from '../../items/item.abstract';
import { InventoryError } from './inventory-error';

export class ItemNotFoundError extends InventoryError {
  constructor(item: Item) {
    super(`${item.name} (${item.type}) not found in inventory`);
    this.name = 'ItemNotFoundError';
  }
}
