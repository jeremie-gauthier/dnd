import { ItemManaCost } from "@dnd/shared";
import { ChildEntity, Column } from "typeorm";
import { AttackItem } from "./attack-item.entity";

@ChildEntity()
export class Spell extends AttackItem {
  @Column({ type: "json", update: false })
  readonly manaCost: ItemManaCost;
}
