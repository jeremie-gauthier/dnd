import { BlanketOfFlames } from "../../domain/item/chest-trap/blanket-of-flames.trap";
import { BrutalBetrayal } from "../../domain/item/chest-trap/brutal-betrayal.trap";
import { CallFromTheGrave } from "../../domain/item/chest-trap/call-from-the-grave.trap";
import { ChestTrap as ChestTrapDomain } from "../../domain/item/chest-trap/chest-trap.abstract";
import { DazzlingLight } from "../../domain/item/chest-trap/dazzling-light.trap";
import { MagicLoss } from "../../domain/item/chest-trap/magic-loss.trap";
import { SmotheringMist } from "../../domain/item/chest-trap/smothering-mist.trap";
import { VoicesOfTheDamned } from "../../domain/item/chest-trap/voices-of-the-damned.trap";
import { ItemPerk } from "../../domain/item/item-perk";
import { ItemType } from "../../infra/database/enums/item-type.enum";

export class ChestTrapApplicationFactory {
  private constructor() {}

  public static create({
    name,
    ...rest
  }: {
    name: string;
    level: number;
    itemPerks: Array<ItemPerk>;
  }): ChestTrapDomain {
    switch (name) {
      case "blanket_of_flames_1":
        return new BlanketOfFlames(rest);
      case "magic_loss_1":
        return new MagicLoss(rest);
      case "brutal_betrayal_1":
        return new BrutalBetrayal(rest);
      case "smothering_mist_1":
        return new SmotheringMist(rest);
      case "dazzling_light_1":
        return new DazzlingLight(rest);
      case "voices_of_the_damned_1":
        return new VoicesOfTheDamned(rest);
      case "call_from_the_grave_1":
        return new CallFromTheGrave(rest);
      default:
        throw new Error(`No "${name}" ${ItemType.CHESTTRAP} item found`);
    }
  }
}
