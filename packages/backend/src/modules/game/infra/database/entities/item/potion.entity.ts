import { ChildEntity, Column } from "typeorm";
import { ItemType } from "../../enums/item-type.enum";
import { Item } from "./item.entity";

@ChildEntity()
export class Potion extends Item {
  @Column({ default: ItemType.POTION, update: false })
  override readonly type = ItemType.POTION;
}
