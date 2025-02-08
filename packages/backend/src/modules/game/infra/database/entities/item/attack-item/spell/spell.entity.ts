import {
  ChildEntity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Relation,
} from "typeorm";
import { ItemType } from "../../../../enums/item-type.enum";
import { Item } from "../../item.entity";
import { SpellAttack } from "../attack/spell-attack.entity";
import { ManaCost } from "./mana-cost.entity";

@ChildEntity(ItemType.SPELL)
export class Spell extends Item {
  override readonly type = ItemType.SPELL;

  @ManyToMany(() => ManaCost, { cascade: true })
  @JoinTable()
  readonly manaCosts: Relation<ManaCost[]>;

  @OneToMany(
    () => SpellAttack,
    (attack) => attack.attackItem,
    { cascade: true },
  )
  readonly attacks: Relation<SpellAttack[]>;
}
