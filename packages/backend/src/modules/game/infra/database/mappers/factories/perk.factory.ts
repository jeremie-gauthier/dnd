import { PerkApplicationFactory } from "src/modules/game/application/factories/perk.factory";
import { Perk as PerkDomain } from "src/modules/game/domain/perk/perk.abstract";
import { Perk as PerkPersistence } from "../../entities/item/perk.entity";

export class PerkFactory {
  private constructor() {}

  public static create(perk: PerkPersistence): PerkDomain {
    return PerkApplicationFactory.create(perk.name);
  }
}
