import { ChildEntity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Attack } from "./attack.entity";
import { Item } from "./item.entity";
import { Perk } from "./perk.entity";

@ChildEntity()
export class AttackItem extends Item {
  @OneToMany(
    () => Attack,
    (attack) => attack.item,
    { cascade: true },
  )
  readonly attacks: Attack[];

  @ManyToMany(() => Perk)
  @JoinTable()
  readonly perks: Perk[];
}
