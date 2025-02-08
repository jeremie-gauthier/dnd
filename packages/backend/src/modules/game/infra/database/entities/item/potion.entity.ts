import { ChildEntity } from "typeorm";
import { ItemType } from "../../enums/item-type.enum";
import { Item } from "./item.entity";

@ChildEntity(ItemType.POTION)
export class Potion extends Item {
  override readonly type = ItemType.POTION;
}
