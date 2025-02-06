import { ImperiousHandPotion } from "../../domain/item/potion/imperious-hand-potion.potion";
import { InitiativePotion } from "../../domain/item/potion/initiative-potion.potion";
import { KordsBlessingPotion } from "../../domain/item/potion/kords-blessing-potion.potion";
import { LightHealingPotion } from "../../domain/item/potion/light-healing-potion.potion";
import { OlidammaraWisdomPotion } from "../../domain/item/potion/olidammara-wisdom-potion.potion";
import { PartialRestorationPotion } from "../../domain/item/potion/partial-restoration-potion.potion";
import { PotionOfLaughter } from "../../domain/item/potion/potion-of-laughter.potion";
import { PotionOfWeakness } from "../../domain/item/potion/potion-of-weakness.potion";
import { Potion as PotionDomain } from "../../domain/item/potion/potion.abstract";
import { SmokeShadowPotion } from "../../domain/item/potion/smoke-shadow-potion.potion";
import { UltimateRestorationPotion } from "../../domain/item/potion/ultimate-restoration-potion.potion";
import { ItemType } from "../../infra/database/enums/item-type.enum";

export class PotionApplicationFactory {
  private constructor() {}

  public static create(potionName: string): PotionDomain {
    switch (potionName) {
      case "potion_of_weakness_1":
        return new PotionOfWeakness();
      case "smoke_shadow_potion_1":
        return new SmokeShadowPotion();
      case "kords_blessing_potion_1":
        return new KordsBlessingPotion();
      case "imperious_hand_potion_1":
        return new ImperiousHandPotion();
      case "potion_of_laughter_1":
        return new PotionOfLaughter();
      case "olidammara_wisdom_potion_1":
        return new OlidammaraWisdomPotion();
      case "partial_restoration_potion_1":
        return new PartialRestorationPotion();
      case "initiative_potion_1":
        return new InitiativePotion();
      case "ultimate_restoration_potion_1":
        return new UltimateRestorationPotion();
      case "light_healing_potion_1":
        return new LightHealingPotion();
      default:
        throw new Error(`No "${potionName}" ${ItemType.POTION} item found`);
    }
  }
}
