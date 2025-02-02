import { PerkName } from "src/database/enums/perk-name.enum";
import { PerkTrigger } from "src/database/enums/perk-trigger.enum";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Stopped } from "../playable-entities/playable-entity/conditions/stopped.condition";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class Stop extends Perk {
  constructor() {
    super({ name: PerkName.STOP, trigger: PerkTrigger.SPECIAL_DICE });
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
      new Stopped({ remainingTurns: 1, playableEntityAffected: defender }),
    );
  }
}
