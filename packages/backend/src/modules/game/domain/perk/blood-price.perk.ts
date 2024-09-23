import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class BloodPrice extends Perk {
  constructor() {
    super({ name: "blood_price", trigger: "special_dice" });
  }

  public apply({
    attacker,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    attacker.takeDirectDamage({ amount: 1 });
  }
}
