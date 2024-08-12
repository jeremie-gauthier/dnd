import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Relation,
  RelationId,
} from "typeorm";
import { Dice } from "./dice.entity";

@Entity()
export class DiceUI {
  @PrimaryColumn()
  @RelationId((diceUI: DiceUI) => diceUI.dice)
  readonly diceName: Relation<Dice["name"]>;

  @OneToOne(() => Dice, { nullable: false })
  @JoinColumn()
  readonly dice: Dice;

  @Column({ type: "character varying", length: 9 })
  readonly color: `#${string}`;
}
