import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  TableInheritance,
} from "typeorm";
import {
  WinConditionNameType,
  WinConditionNameValues,
} from "../../enums/win-condition-name.enum";
import { Game } from "../game.entity";

@Entity()
@TableInheritance({ column: "name" })
export class WinCondition {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(
    () => Game,
    (game) => game.winConditions,
    { onDelete: "CASCADE" },
  )
  readonly game: Relation<Game>;

  @Column({ type: "enum", enum: WinConditionNameValues, update: false })
  readonly name: WinConditionNameType;
}
