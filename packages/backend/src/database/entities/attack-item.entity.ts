import {
  ChildEntity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Relation,
} from "typeorm";
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
  readonly attacks: Relation<Attack[]>;

  @ManyToMany(() => Perk)
  @JoinTable()
  readonly perks: Relation<Perk[]>;
}
