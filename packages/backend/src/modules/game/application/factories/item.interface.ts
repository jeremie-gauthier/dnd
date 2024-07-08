import { AttackRangeType, AttackTypeType, ItemManaCostJson } from "@dnd/shared";

type BaseItem = {
  type: "Weapon" | "Spell";
  name: string;
  level: number;
};

type Dice = {
  name: string;
  values: [number, number, number, number, number, number];
};

type AttackItem = BaseItem & {
  attacks: Array<{
    id: string;
    range: AttackRangeType;
    type: AttackTypeType;
    dices: Dice[];
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
