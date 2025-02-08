import { Entity, ManyToOne, Relation } from "typeorm";
import { ItemPerk } from "../../item-perk.entity";
import { DiceThrow } from "./dice-throw.entity";

@Entity()
export class ItemPerkDiceThrow extends DiceThrow<ItemPerk> {
  @ManyToOne(
    () => ItemPerk,
    (itemPerk) => itemPerk.diceThrows,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly cause: Relation<ItemPerk>;
}
