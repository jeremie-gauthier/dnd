import { ChildEntity, OneToMany, Relation } from "typeorm";
import { ItemType } from "../../../enums/item-type.enum";
import { Item } from "../item.entity";
import { WeaponAttack } from "./attack/weapon-attack.entity";

@ChildEntity(ItemType.WEAPON)
export class Weapon extends Item {
  override readonly type = ItemType.WEAPON;

  @OneToMany(
    () => WeaponAttack,
    (attack) => attack.attackItem,
    { cascade: true },
  )
  readonly attacks: Relation<WeaponAttack[]>;
}
