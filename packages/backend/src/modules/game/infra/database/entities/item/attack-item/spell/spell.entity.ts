import { ChildEntity, Column, JoinTable, ManyToMany, Relation } from "typeorm";
import { ItemType } from "../../../../enums/item-type.enum";
import { AttackItem } from "../attack-item.entity";
import { ManaCost } from "./mana-cost.entity";

@ChildEntity()
export class Spell extends AttackItem {
  @Column({ default: ItemType.SPELL, update: false })
  override readonly type = ItemType.SPELL;

  @ManyToMany(() => ManaCost, { cascade: true })
  @JoinTable()
  readonly manaCosts: Relation<ManaCost[]>;
}
