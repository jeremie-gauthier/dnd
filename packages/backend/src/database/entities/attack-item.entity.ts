import { ChildEntity, OneToMany, Relation } from "typeorm";
import { Attack } from "./attack.entity";
import { Item } from "./item.entity";

@ChildEntity()
export class AttackItem extends Item {
  @OneToMany(
    () => Attack,
    (attack) => attack.item,
    { cascade: true },
  )
  readonly attacks: Relation<Attack[]>;
}
