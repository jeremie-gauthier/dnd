import { BlanketOfFlames } from "../../domain/item/chest-trap/blanket-of-flames.trap";
import { BrutalBetrayal } from "../../domain/item/chest-trap/brutal-betrayal.trap";
import { CallFromTheGrave } from "../../domain/item/chest-trap/call-from-the-grave.trap";
import { ChestTrap as ChestTrapDomain } from "../../domain/item/chest-trap/chest-trap.abstract";
import { DazzlingLight } from "../../domain/item/chest-trap/dazzling-light.trap";
import { MagicLoss } from "../../domain/item/chest-trap/magic-loss.trap";
import { SmotheringMist } from "../../domain/item/chest-trap/smothering-mist.trap";
import { VoicesOfTheDamned } from "../../domain/item/chest-trap/voices-of-the-damned.trap";
import { ItemType } from "../../infra/database/enums/item-type.enum";

export class ChestTrapApplicationFactory {
  private constructor() {}

  public static create(chestTrapName: string): ChestTrapDomain {
    switch (chestTrapName) {
      case "blanket_of_flames_1":
        return new BlanketOfFlames();
      case "magic_loss_1":
        return new MagicLoss();
      case "brutal_betrayal_1":
        return new BrutalBetrayal();
      case "smothering_mist_1":
        return new SmotheringMist();
      case "dazzling_light_1":
        return new DazzlingLight();
      case "voices_of_the_damned_1":
        return new VoicesOfTheDamned();
      case "call_from_the_grave_1":
        return new CallFromTheGrave();
      default:
        throw new Error(
          `No "${chestTrapName}" ${ItemType.CHESTTRAP} item found`,
        );
    }
  }
}
