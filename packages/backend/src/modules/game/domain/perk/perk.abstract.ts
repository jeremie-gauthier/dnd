import { ValueObject } from "src/modules/shared/domain/value-object";
import { PerkNameType } from "../../infra/database/enums/perk-name.enum";
import {
  PerkTrigger,
  PerkTriggerType,
} from "../../infra/database/enums/perk-trigger.enum";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";

type Data = {
  readonly name: PerkNameType;
  readonly trigger: PerkTriggerType;
};

export abstract class Perk extends ValueObject<Data> {
  public abstract apply(_: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void;

  public triggersOnSpecialDice() {
    return this._data.trigger === PerkTrigger.SPECIAL_DICE;
  }

  public override equals(other: Perk): boolean {
    return (
      this._data.name === other._data.name &&
      this._data.trigger === other._data.trigger
    );
  }

  public override toPlain() {
    return {
      name: this._data.name,
      trigger: this._data.trigger,
    };
  }
}
