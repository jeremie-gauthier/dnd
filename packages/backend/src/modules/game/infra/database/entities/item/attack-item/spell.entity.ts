import { MagicHeroClassType } from "src/database/enums/hero-class.enum";
import { ItemType } from "src/database/enums/item-type.enum";
import { AttackItem } from "./attack-item.entity";

export type ItemManaCostJson = Partial<Record<MagicHeroClassType, number>>;

export class Spell extends AttackItem {
  override readonly type = ItemType.SPELL;
  manaCost: ItemManaCostJson;
}
