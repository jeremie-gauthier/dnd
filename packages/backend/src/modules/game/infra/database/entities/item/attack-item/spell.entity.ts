import { HeroClassType } from "src/database/enums/hero-class.enum";
import { AttackItem } from "./attack-item.entity";

export type ItemManaCostJson = Partial<Record<HeroClassType, number>>;

export class Spell extends AttackItem {
  type: "Spell";
  manaCost: ItemManaCostJson;
}
