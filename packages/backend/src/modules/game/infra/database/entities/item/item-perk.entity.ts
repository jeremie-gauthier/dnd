import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { ItemPerkDiceThrow } from "./dice/dice-throw/item-perk-dice-throw.entity";
import { Perk } from "./perk.entity";

@Entity()
export class ItemPerk {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Perk, { nullable: false })
  readonly perk: Relation<Perk>;

  @OneToMany(
    () => ItemPerkDiceThrow,
    (diceThrow) => diceThrow.cause,
    { cascade: true },
  )
  readonly diceThrows: Relation<ItemPerkDiceThrow[]>;
}
