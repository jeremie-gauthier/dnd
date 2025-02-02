import { AttackRangeType } from "src/database/enums/attack-range.enum";

export interface CsvItemRecord {
  item_id: string;
  item_name_translation: string;
  item_level: 0 | 1 | 2 | 3;
  item_type: "potion" | "artifact" | "spell" | "trap" | "weapon";
  range: "" | AttackRangeType;
  regular_attack_dices: string;
  regular_attack_perks: string;
  super_attack_dices: string;
  super_attack_perks: string;
  is_lootable_in_chest: 0 | 1;
  mana_cost: string;
}
