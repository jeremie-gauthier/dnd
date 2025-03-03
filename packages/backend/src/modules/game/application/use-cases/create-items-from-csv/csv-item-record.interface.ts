import { AttackRangeType } from "src/modules/game/infra/database/enums/attack-range.enum";

export interface CsvItemRecord {
  item_id: string;
  item_name_translation: string;
  item_level: 0 | 1 | 2 | 3;
  item_type: "Potion" | "Artifact" | "Spell" | "ChestTrap" | "Weapon";
  range: "" | AttackRangeType;
  item_perk: string;
  item_perk_dices: string;
  regular_attack_dices: string;
  regular_attack_perks: string;
  super_attack_dices: string;
  super_attack_perks: string;
  is_lootable_in_chest: 0 | 1;
  mana_cost: string;
}
