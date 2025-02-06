import { OneToMany, Relation } from "typeorm";
import { Item } from "../item.entity";
import { Attack } from "./attack.entity";

export class AttackItem extends Item {
  readonly type: "Weapon" | "Spell";

  @OneToMany(
    () => Attack,
    (attack) => attack.item,
    { cascade: true },
  )
  readonly attacks: Relation<Attack[]>;
}
