import { AttackRangeType, AttackTypeType } from "../enums";

type EnemyWeapon = {
  type: "Weapon";
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
