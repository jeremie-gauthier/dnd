import { BloodPrice } from "../../domain/perk/blood-price.perk";
import { Breakable } from "../../domain/perk/breakable.perk";
import { CriticalFailure } from "../../domain/perk/critical-failure.perk";
import { DoubleDamage } from "../../domain/perk/double-damage.perk";
import { Frozen } from "../../domain/perk/frozen.perk";
import { GreaterHealing } from "../../domain/perk/greater-healing.perk";
import { IgnoreArmorClass } from "../../domain/perk/ignore-armor-class.perk";
import { ManaLeech } from "../../domain/perk/mana-leech.perk";
import { Perk } from "../../domain/perk/perk.abstract";
import { RerollAllDices } from "../../domain/perk/reroll-all-dices.perk";
import { RerollOneDice } from "../../domain/perk/reroll-one-dice.perk";
import { Stop } from "../../domain/perk/stop.perk";
import { TurnUndead } from "../../domain/perk/turn-undead.perk";
import {
  PerkName,
  PerkNameType,
} from "../../infra/database/enums/perk-name.enum";

export class PerkApplicationFactory {
  private constructor() {}

  public static create(perkName: PerkNameType): Perk {
    switch (perkName) {
      case PerkName.MANA_LEECH:
        return new ManaLeech();
      case PerkName.BREAKABLE:
        return new Breakable();
      case PerkName.CRITICAL_FAILURE:
        return new CriticalFailure();
      case PerkName.GREATER_HEALING:
        return new GreaterHealing();
      case PerkName.BLOOD_PRICE:
        return new BloodPrice();
      case PerkName.DOUBLE_DAMAGE:
        return new DoubleDamage();
      case PerkName.FROZEN:
        return new Frozen();
      case PerkName.IGNORE_ARMOR_CLASS:
        return new IgnoreArmorClass();
      case PerkName.REROLL_ALL_DICES:
        return new RerollAllDices();
      case PerkName.REROLL_ONE_DICE:
        return new RerollOneDice();
      case PerkName.STOP:
        return new Stop();
      case PerkName.TURN_UNDEAD:
        return new TurnUndead();
      default:
        throw new Error(`No "${perkName}" perk found`);
    }
  }
}
