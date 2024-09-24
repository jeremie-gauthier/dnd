import { Item } from "../../domain/item/item.abstract";

export interface ItemDevRepository {
  createMany(data: {
    items: Array<{ record: { is_lootable_in_chest: 0 | 1 }; item: Item }>;
  }): Promise<void>;
}

export const ITEM_DEV_REPOSITORY = Symbol("ItemDevRepository");
