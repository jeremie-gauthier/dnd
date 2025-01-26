import { Item } from "../item.entity";
import { Attack } from "./attack.entity";

export abstract class AttackItem extends Item {
  abstract type: "Weapon" | "Spell";
  attacks: Array<Attack>;
}
