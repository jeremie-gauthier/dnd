import { Inventory } from "./inventory.type";
import { MonsterEntity } from "./playable-entity/monster.type";

export type MonsterTemplate = {
  type: MonsterEntity["type"];
  race: MonsterEntity["race"];
  characteristic: {
    baseHealthPoints: number;
    baseManaPoints: number;
    baseArmorClass: number;
    baseMovementPoints: number;
    baseActionPoints: number;
  };
  inventory: Inventory;
};
