import { ChildEntity, Column } from "typeorm";
import { ItemType } from "../../../enums/item-type.enum";
import { AttackItem } from "./attack-item.entity";

@ChildEntity()
export class Weapon extends AttackItem {
  @Column({ default: ItemType.WEAPON, update: false })
  override readonly type = ItemType.WEAPON;
}
