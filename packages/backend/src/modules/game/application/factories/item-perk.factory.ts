import { Dice } from "../../domain/dice/dice.vo";
import { ItemPerk } from "../../domain/item/item-perk";
import { Perk } from "../../domain/perk/perk.abstract";

export class ItemPerkApplicationFactory {
  private constructor() {}

  public static create(data: {
    id: string;
    perk: Perk;
    dices: Array<Dice>;
  }): ItemPerk {
    return new ItemPerk(data);
  }
}
