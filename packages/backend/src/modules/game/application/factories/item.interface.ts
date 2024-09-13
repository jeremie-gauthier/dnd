import {
  AttackRangeType,
  AttackTypeType,
  ItemManaCostJson,
  PerkNameType,
  PerkTriggerType,
} from "@dnd/shared";

type BaseItem = {
  type: "Weapon" | "Spell";
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

type AttackItem = BaseItem & {
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

export type GameItem = WeaponItem | SpellItem;
