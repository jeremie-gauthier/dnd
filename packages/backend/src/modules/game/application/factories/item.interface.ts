import {
  AttackRangeType,
  AttackTypeType,
  ItemManaCostJson,
  PerkNameType,
  PerkTriggerType,
} from "@dnd/shared";

type BaseItem = {
  type: "Weapon" | "Spell" | "ChestTrap";
  name: string;
  level: number;
};

type Dice = {
  name: string;
  values: [number, number, number, number, number, number];
};

type AttackPerk = {
  name: PerkNameType;
  trigger: PerkTriggerType;
};

export type AttackItem = BaseItem & {
  type: "Weapon" | "Spell";
  attacks: Array<{
    id: string;
    range: AttackRangeType;
    type: AttackTypeType;
    dices: Dice[];
    perks: Array<AttackPerk>;
  }>;
};

export type WeaponItem = AttackItem & {
  type: "Weapon";
};
export type SpellItem = AttackItem & {
  type: "Spell";
  manaCost: ItemManaCostJson;
};
export type ChestTrapItem = BaseItem & {
  type: "ChestTrap";
};

export type GameItem = WeaponItem | SpellItem | ChestTrapItem;
