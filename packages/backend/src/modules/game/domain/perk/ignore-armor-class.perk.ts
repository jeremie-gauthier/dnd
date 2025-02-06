import { PerkName } from "../../infra/database/enums/perk-name.enum";
import { PerkTrigger } from "../../infra/database/enums/perk-trigger.enum";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { BrokenArmor } from "../playable-entities/playable-entity/conditions/broken-armor.condition";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class IgnoreArmorClass extends Perk {
  constructor() {
    super({
      name: PerkName.IGNORE_ARMOR_CLASS,
      trigger: PerkTrigger.SPECIAL_DICE,
    });
  }

  public override apply({
    defender,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    defender.addCondition(
      new BrokenArmor({ remainingTurns: 0, playableEntityAffected: defender }),
    );
  }
}
