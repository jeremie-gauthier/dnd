import { Inventory } from "./inventory.type";
import { MonsterEntity } from "./playable-entity/monster.type";

export type MonsterTemplate = {
  kind: MonsterEntity["kind"];
  characteristic: {
    baseHealthPoints: number;
    baseManaPoints: number;
    baseArmorClass: number;
    baseMovementPoints: number;
    baseActionPoints: number;
  };
  inventory: Inventory;
};
