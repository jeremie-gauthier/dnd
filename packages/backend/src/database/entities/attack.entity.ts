import {
  AttackRangeType,
  AttackRangeValues,
  AttackTypeType,
  AttackTypeValues,
} from "@dnd/shared";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AttackItem } from "./attack-item.entity";
import { Dice } from "./dice.entity";

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

  @ManyToMany(() => Dice)
  @JoinTable()
  readonly dices: Dice[];
}
