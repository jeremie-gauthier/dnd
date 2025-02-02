import { ItemType } from "src/database/enums/item-type.enum";
import { Item } from "./item.entity";

export class Potion extends Item {
  override readonly type = ItemType.POTION;
}
