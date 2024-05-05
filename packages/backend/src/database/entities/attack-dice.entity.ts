import { Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Attack } from "./attack.entity";
import { Dice } from "./dice.entity";

@Entity()
export class AttackDice {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(
    () => Attack,
    (attack) => attack.attackDices,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly attack: Relation<Attack>;

  @ManyToOne(() => Dice, { onDelete: "CASCADE", nullable: false })
  readonly dice: Relation<Dice>;
}
