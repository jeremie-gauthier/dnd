import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class ManaLeech extends Perk {
  constructor() {
    super({ name: "mana_leech", trigger: "special_dice" });
  }

  public apply({
    attacker,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    attacker.regenMana({ amount: 1 });
  }
}
