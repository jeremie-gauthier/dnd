import { Item } from "../item.entity";
import { Attack } from "./attack.entity";

export abstract class AttackItem extends Item {
  abstract readonly type: "Weapon" | "Spell";
  attacks: Array<Attack>;
}
