import { ItemType } from "src/database/enums/item-type.enum";
import { AttackItem } from "./attack-item.entity";

export class Weapon extends AttackItem {
  override readonly type = ItemType.WEAPON;
}
