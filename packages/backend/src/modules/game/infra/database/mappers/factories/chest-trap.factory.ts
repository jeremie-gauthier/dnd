import { ChestTrapApplicationFactory } from "src/modules/game/application/factories/chest-trap.factory";
import { ChestTrap as ChestTrapDomain } from "src/modules/game/domain/item/chest-trap/chest-trap.abstract";
import { ChestTrap as ChestTrapPersistence } from "src/modules/game/infra/database/entities/item/chest-trap.entity";

export class ChestTrapFactory {
  private constructor() {}

  public static create(chestTrap: ChestTrapPersistence): ChestTrapDomain {
    return ChestTrapApplicationFactory.create(chestTrap.name);
  }
}
