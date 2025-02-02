import { ChildEntity, Column, Index } from "typeorm";
import { MagicHeroClassType } from "../enums/hero-class.enum";
import { AttackItem } from "./attack-item.entity";

@ChildEntity()
export class Spell extends AttackItem {
  @Index()
  @Column({ default: "Spell", update: false })
  readonly type: "Spell";

  @Column({ type: "json", update: false })
  readonly manaCost: Partial<Record<MagicHeroClassType, number>>;
}
