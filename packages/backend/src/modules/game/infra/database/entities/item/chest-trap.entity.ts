import { ItemType } from "src/database/enums/item-type.enum";
import { Item } from "./item.entity";

export class ChestTrap extends Item {
  override readonly type = ItemType.CHESTTRAP;
}
