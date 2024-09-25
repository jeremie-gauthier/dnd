import { User } from "src/database/entities/user.entity";
import { Item } from "../../domain/item/item.abstract";
import { GameItem } from "../factories/item.interface";

export interface ItemRepository {
  getOneOrThrow(data: { name: GameItem["name"] }): Promise<Item>;
  getOneRandom(filters: {
    itemsLooted: Array<GameItem["name"]>;
    maxLevelLoot: GameItem["level"];
    hostUserId: User["id"];
  }): Promise<Item>;
}

export const ITEM_REPOSITORY = Symbol("ItemRepository");
