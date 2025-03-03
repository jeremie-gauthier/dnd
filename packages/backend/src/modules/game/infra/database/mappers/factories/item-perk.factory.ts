import { ItemPerkApplicationFactory } from "src/modules/game/application/factories/item-perk.factory";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { ItemPerk as ItemPerkDomain } from "src/modules/game/domain/item/item-perk";
import { ItemPerk as ItemPerkPersistence } from "../../entities/item/item-perk.entity";
import { PerkFactory } from "./perk.factory";

export class ItemPerkFactory {
  private constructor() {}

  public static create(data: ItemPerkPersistence): ItemPerkDomain {
    const dices = data.diceThrows.map((diceThrow) => new Dice(diceThrow.dice));
    const perk = PerkFactory.create(data.perk);

    return ItemPerkApplicationFactory.create({
      id: data.id,
      dices,
      perk,
    });
  }
}
