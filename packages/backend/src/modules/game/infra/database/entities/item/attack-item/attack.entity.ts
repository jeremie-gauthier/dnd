import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import {
  AttackRangeType,
  AttackRangeValues,
} from "../../../enums/attack-range.enum";
import {
  AttackTypeType,
  AttackTypeValues,
} from "../../../enums/attack-type.enum";
import { Perk } from "../perk.entity";
import { AttackDice } from "./attack-dice.entity";
import { AttackItem } from "./attack-item.entity";

@Entity()
export class Attack {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({
    type: "enum",
    enum: AttackRangeValues,
    enumName: "AttackRange",
    update: false,
  })
  readonly range: AttackRangeType;

  @Column({
    type: "enum",
    enum: AttackTypeValues,
    enumName: "AttackType",
    update: false,
  })
  readonly type: AttackTypeType;

  @ManyToOne(
    () => AttackItem,
    (attackItem) => attackItem.attacks,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly item: Relation<AttackItem>;

  @OneToMany(
    () => AttackDice,
    (attackDice) => attackDice.attack,
    { cascade: true },
  )
  readonly attackDices: Relation<AttackDice[]>;

  @ManyToMany(() => Perk)
  @JoinTable()
  readonly perks: Relation<Perk[]>;
}
