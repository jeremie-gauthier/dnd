import { AttackRangeType, AttackTypeType } from "../enums";
import { ItemManaCostJson } from "../json";

type BaseItem = {
  type: "Weapon" | "Spell";
  name: string;
  level: number;
  imgUrl: string;
};

type Dice = {
  name: string;
  color: `#${string}`;
  values: [number, number, number, number, number, number];
  minValue: number;
  maxValue: number;
  meanValue: number;
};

type AttackItem = BaseItem & {
  attacks: {
    id: string;
    range: AttackRangeType;
    type: AttackTypeType;
    dices: Dice[];
  }[];
  perks: { name: string; iconUrl: string }[];
};

export type WeaponItem = AttackItem & {
  type: "Weapon";
};
export type SpellItem = AttackItem & {
  type: "Spell";
  manaCost: ItemManaCostJson;
};

export type GameItem = WeaponItem | SpellItem;
