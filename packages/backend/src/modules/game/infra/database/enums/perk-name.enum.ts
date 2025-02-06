export const PerkName = {
  REROLL_ONE_DICE: "reroll_one_dice",
  REROLL_ALL_DICES: "reroll_all_dices",
  CRITICAL_FAILURE: "critical_failure",
  MANA_LEECH: "mana_leech",
  BREAKABLE: "breakable",
  STOP: "stop",
  FROZEN: "frozen",
  GREATER_HEALING: "greater_healing",
  IGNORE_ARMOR_CLASS: "ignore_armor_class",
  BLOOD_PRICE: "blood_price",
  TURN_UNDEAD: "turn_undead",
  DOUBLE_DAMAGE: "double_damage",
} as const;

export const PerkNameValues = Object.values(PerkName);

export type PerkNameType = (typeof PerkName)[keyof typeof PerkName];
