import { Item } from "../../domain/item/item.abstract";
import { GameItem } from "../factories/item.interface";

export interface ItemRepository {
  getOneOrThrow(data: { name: GameItem["name"] }): Promise<Item>;
}

export const ITEM_REPOSITORY = Symbol("ItemRepository");
