import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import {
  WinConditionNameType,
  WinConditionNameValues,
} from "../../enums/win-condition-name.enum";
import { Game } from "../game.entity";

@Entity()
export class CurrentWinCondition {
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

  @Column({ type: "json" })
  readonly data: Record<string, unknown>;
}
