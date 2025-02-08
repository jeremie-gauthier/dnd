import { ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { SpellAttack } from "../../attack-item/attack/spell-attack.entity";
import { WeaponAttack } from "../../attack-item/attack/weapon-attack.entity";
import { ItemPerk } from "../../item-perk.entity";
import { Dice } from "../dice.entity";

export abstract class DiceThrow<
  TCause extends SpellAttack | WeaponAttack | ItemPerk,
> {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  abstract readonly cause: Relation<TCause>;

  @ManyToOne(() => Dice, { onDelete: "CASCADE", nullable: false })
  readonly dice: Relation<Dice>;
}
