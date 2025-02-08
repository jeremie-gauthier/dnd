import { Entity, ManyToOne, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { ItemPerkDiceThrow } from "./dice/dice-throw/item-perk-dice-throw.entity";
import { Perk } from "./perk.entity";

@Entity()
export class ItemPerk {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Perk, { nullable: false })
  readonly perks: Relation<Perk>;

  @OneToMany(
    () => ItemPerkDiceThrow,
    (diceThrow) => diceThrow.cause,
    { cascade: true },
  )
  readonly diceThrows: Relation<ItemPerkDiceThrow[]>;
}
