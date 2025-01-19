import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class Breakable extends Perk {
  constructor() {
    super({ name: "breakable", trigger: "special_dice" });
  }

  public override apply({
    attacker,
    itemUsed,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    attacker.inventory.removeItemFromInventory({ item: itemUsed });
  }
}
