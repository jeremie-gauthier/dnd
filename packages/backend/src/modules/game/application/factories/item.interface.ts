import {
  AttackRangeType,
  AttackTypeType,
  ItemManaCostJson,
  PerkNameType,
  PerkTriggerType,
} from "@dnd/shared";

type BaseItem = {
  type: "Weapon" | "Spell" | "ChestTrap" | "Potion" | "Artifact";
  name: string;
  level: number;
};

type Dice = {
  name: string;
  values: [number, number, number, number, number, number];
};

type Perk = {
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
    perks: Array<Perk>;
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
export type PotionItem = BaseItem & {
  type: "Potion";
};
export type ArtifactItem = BaseItem & {
  type: "Artifact";
  hasSavingThrow: boolean;
};

export type GameItem =
  | WeaponItem
  | SpellItem
  | ChestTrapItem
  | PotionItem
  | ArtifactItem;
