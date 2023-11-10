import { InventoryError } from './inventory-error';

export class NoSpaceLeftError extends InventoryError {
  constructor() {
    super(`No space left in inventory`);
    this.name = 'NoSpaceLeftError';
  }
}
