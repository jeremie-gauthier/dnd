import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Game } from "../game.entity";
import { GameEvent } from "./game-event.entity";

@Entity()
export class CurrentGameEvent {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Game, { nullable: false })
  readonly game: Relation<Game>;

  @ManyToOne(() => GameEvent, { nullable: false })
  readonly gameEvent: Relation<GameEvent>;

  @Column()
  readonly hasBeenTriggered: boolean;
}
