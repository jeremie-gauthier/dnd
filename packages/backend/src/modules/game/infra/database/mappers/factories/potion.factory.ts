import { PotionApplicationFactory } from "src/modules/game/application/factories/potion.factory";
import { Potion as PotionDomain } from "src/modules/game/domain/item/potion/potion.abstract";
import { Potion as PotionPersistence } from "src/modules/game/infra/database/entities/item/potion.entity";
import { ItemPerkFactory } from "./item-perk.factory";

export class PotionFactory {
  private constructor() {}

  public static create(potion: PotionPersistence): PotionDomain {
    return PotionApplicationFactory.create({
      name: potion.name,
      level: potion.level,
      itemPerks: potion.itemPerks.map((itemPerkPersistence) =>
        ItemPerkFactory.create(itemPerkPersistence),
      ),
    });
  }
}
