import { PerkName } from "src/database/enums/perk-name.enum";
import { PerkTrigger } from "src/database/enums/perk-trigger.enum";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class RerollOneDice extends Perk {
  constructor() {
    super({
      name: PerkName.REROLL_ONE_DICE,
      trigger: PerkTrigger.ONCE_PER_ATTACK,
    });
  }

  public override apply(_: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {}
}
