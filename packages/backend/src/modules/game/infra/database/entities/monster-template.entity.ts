import { Inventory } from "./inventory.entity";
import { MonsterEntity } from "./playable-entity/monster.entity";

export class MonsterTemplate {
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
}
