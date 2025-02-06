import { PerkName } from "../../infra/database/enums/perk-name.enum";
import { PerkTrigger } from "../../infra/database/enums/perk-trigger.enum";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class Breakable extends Perk {
  constructor() {
    super({ name: PerkName.BREAKABLE, trigger: PerkTrigger.SPECIAL_DICE });
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
