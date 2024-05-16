import { ItemManaCostJson } from "@dnd/shared";
import { ChildEntity, Column, Index } from "typeorm";
import { AttackItem } from "./attack-item.entity";

@ChildEntity()
export class Spell extends AttackItem {
  @Index()
  @Column({ default: "spell", update: false })
  readonly type: "spell";

  @Column({ type: "json", update: false })
  readonly manaCost: ItemManaCostJson;
}
