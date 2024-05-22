import { ItemManaCostJson } from "@dnd/shared";
import { ChildEntity, Column, Index } from "typeorm";
import { AttackItem } from "./attack-item.entity";

@ChildEntity()
export class Spell extends AttackItem {
  @Index()
  @Column({ default: "Spell", update: false })
  readonly type: "Spell";

  @Column({ type: "json", update: false })
  readonly manaCost: ItemManaCostJson;
}
