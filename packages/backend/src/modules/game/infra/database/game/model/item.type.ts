import { AttackRangeType, AttackTypeType, ItemManaCostJson } from "@dnd/shared";

type BaseItem = {
  id: string;
  type: "Weapon" | "Spell";
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
    dices: Dice[];
  }[];
  perks: { name: string }[];
};

type WeaponItem = AttackItem & {
  type: "Weapon";
};
type SpellItem = AttackItem & {
  type: "Spell";
  manaCost: ItemManaCostJson;
};

export type Item = BaseItem;
