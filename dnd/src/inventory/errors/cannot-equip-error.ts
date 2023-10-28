import { Item } from '../../items/item.abstract';
import { InventoryError } from './inventory-error';

export class CannotEquipError extends InventoryError {
  constructor(item: Item) {
    super(`Cannot equip ${item.name} (${item.type})`);
    this.name = 'CannotEquipError';
  }
}
