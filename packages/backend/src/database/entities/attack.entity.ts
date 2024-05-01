import {
  AttackRangeType,
  AttackRangeValues,
  AttackTypeType,
  AttackTypeValues,
} from "@dnd/shared";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { AttackDice } from "./attack-dice.entity";
import { AttackItem } from "./attack-item.entity";

@Entity()
export class Attack {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: AttackRangeValues, update: false })
  readonly range: AttackRangeType;

  @Column({ type: "enum", enum: AttackTypeValues, update: false })
  readonly type: AttackTypeType;

  @ManyToOne(
    () => AttackItem,
    (attackItem) => attackItem.attacks,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly item: AttackItem;

  @OneToMany(
    () => AttackDice,
    (attackDice) => attackDice.attack,
    { cascade: true },
  )
  readonly attackDices: Relation<AttackDice[]>;
}
