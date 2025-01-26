import {
  AttackRange,
  AttackRangeType,
  AttackRangeValues,
  AttackTypeType,
  AttackTypeValues,
} from "@dnd/shared";
import { ApiProperty } from "@nestjs/swagger";
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
import { AttackType } from "../enums/attack-type.enum";
import { AttackDice } from "./attack-dice.entity";
import { AttackItem } from "./attack-item.entity";
import { Perk } from "./perk.entity";

@Entity()
export class Attack {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: AttackRangeValues, update: false })
  @ApiProperty({ enum: AttackRange, enumName: "AttackRange" })
  readonly range: AttackRangeType;

  @Column({ type: "enum", enum: AttackTypeValues, update: false })
  @ApiProperty({ enum: AttackType, enumName: "AttackType" })
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
