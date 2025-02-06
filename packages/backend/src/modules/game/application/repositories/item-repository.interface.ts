import { Item as ItemDomain } from "../../domain/item/item.abstract";

export interface ItemRepository {
  getOneOrThrow(data: { name: string }): Promise<ItemDomain>;
  getOneRandom(filters: {
    itemsLooted: Array<string>;
    maxLevelLoot: number;
    hostUserId: string;
  }): Promise<ItemDomain>;
}

export const ITEM_REPOSITORY = Symbol("ItemRepository");
