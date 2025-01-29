import { PerkName } from "src/database/enums/perk-name.enum";
import { PerkTrigger } from "src/database/enums/perk-trigger.enum";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class RerollAllDices extends Perk {
  constructor() {
    super({
      name: PerkName.REROLL_ALL_DICES,
      trigger: PerkTrigger.SPECIAL_DICE,
    });
  }

  public override apply(_: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {}
}
