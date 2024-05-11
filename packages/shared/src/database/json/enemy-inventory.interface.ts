import { AttackRangeType, AttackTypeType } from "../enums";

type EnemyWeapon = {
  type: "weapon" | "spell";
  name: string;
  level: number;
  imgUrl: string;
  attacks: {
    range: AttackRangeType;
    type: AttackTypeType;
    dices: string[];
  }[];
  perks: { name: string; iconUrl: string }[];
};

export type EnemyInventoryJson = {
  gear: EnemyWeapon[];
  backpack: EnemyWeapon[];
};
