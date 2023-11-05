export class InventoryError extends Error {
  constructor(message: string) {
    super(`[-] Inventory error: ${message}`);
    this.name = 'InventoryError';
  }
}
