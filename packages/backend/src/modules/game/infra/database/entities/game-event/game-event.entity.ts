import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  TableInheritance,
} from "typeorm";
import {
  GameEventActionType,
  GameEventActionValues,
} from "../../enums/game-event-action.enum";
import {
  GameEventNameType,
  GameEventNameValues,
} from "../../enums/game-event-name.enum";
import { GameTemplate } from "../game-template.entity";
import { Game } from "../game.entity";

@Entity()
@TableInheritance({ column: "name" })
export class GameEvent {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: GameEventNameValues, update: false })
  readonly name: GameEventNameType;

  @Column({ type: "enum", enum: GameEventActionValues, update: false })
  readonly action: GameEventActionType;

  @ManyToOne(
    () => Game,
    (game) => game.events,
    { onDelete: "CASCADE" },
  )
  readonly game: Relation<GameTemplate>;
}
