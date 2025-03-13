import { Inventory as InventoryDomain } from "../../domain/_inventory/inventory.aggregate";

export interface InventoryManagerRepository {
  getOneOrThrow(data: {
    gameId: string;
    userId: string;
  }): Promise<InventoryDomain>;
  update(data: { inventory: InventoryDomain }): Promise<void>;
}

export const INVENTORY_MANAGER_REPOSITORY = Symbol(
  "InventoryManagerRepository",
);
