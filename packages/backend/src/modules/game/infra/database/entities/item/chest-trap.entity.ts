import { ChildEntity } from "typeorm";
import { ItemType } from "../../enums/item-type.enum";
import { Item } from "./item.entity";

@ChildEntity(ItemType.CHESTTRAP)
export class ChestTrap extends Item {
  override readonly type = ItemType.CHESTTRAP;
}
