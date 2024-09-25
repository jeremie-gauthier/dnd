import { AttackRangeType, AttackTypeType, ItemManaCostJson } from "@dnd/shared";

type BaseItem = {
  type: "Weapon" | "Spell" | "ChestTrap" | "Potion" | "Artifact";
  name: string;
  level: number;
};

type Dice = {
  name: string;
  values: [number, number, number, number, number, number];
};

type AttackItem = BaseItem & {
  attacks: {
    id: string;
    range: AttackRangeType;
    type: AttackTypeType;
    dices: Array<Dice>;
    perks: Array<{ name: string }>;
  }[];
};

type WeaponItem = AttackItem & {
  type: "Weapon";
};
type SpellItem = AttackItem & {
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

export type Item =
  | WeaponItem
  | SpellItem
  | ChestTrapItem
  | PotionItem
  | ArtifactItem;
