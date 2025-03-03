import { ChestTrapApplicationFactory } from "src/modules/game/application/factories/chest-trap.factory";
import { ChestTrap as ChestTrapDomain } from "src/modules/game/domain/item/chest-trap/chest-trap.abstract";
import { ChestTrap as ChestTrapPersistence } from "src/modules/game/infra/database/entities/item/chest-trap.entity";
import { ItemPerkFactory } from "./item-perk.factory";

export class ChestTrapFactory {
  private constructor() {}

  public static create(chestTrap: ChestTrapPersistence): ChestTrapDomain {
    return ChestTrapApplicationFactory.create({
      name: chestTrap.name,
      level: chestTrap.level,
      itemPerks: chestTrap.itemPerks.map((itemPerkPersistence) =>
        ItemPerkFactory.create(itemPerkPersistence),
      ),
    });
  }
}
