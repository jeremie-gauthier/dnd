import { AttackRangeType, AttackTypeType } from "../enums";
import { ItemManaCostJson } from "../json";

type BaseItem = {
  type: "weapon" | "spell";
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
    range: AttackRangeType;
    type: AttackTypeType;
    dices: Dice[];
  }[];
  perks: { name: string; iconUrl: string }[];
};

type WeaponItem = AttackItem;
type SpellItem = AttackItem & {
  manaCost: ItemManaCostJson;
};

export type GameItem = WeaponItem | SpellItem;
