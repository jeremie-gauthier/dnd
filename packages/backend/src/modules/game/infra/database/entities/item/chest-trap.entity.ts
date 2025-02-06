import { ChildEntity, Column } from "typeorm";
import { ItemType } from "../../enums/item-type.enum";
import { Item } from "./item.entity";

@ChildEntity()
export class ChestTrap extends Item {
  @Column({ default: ItemType.CHESTTRAP, update: false })
  override readonly type = ItemType.CHESTTRAP;
}
