import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { Game } from "../game.entity";
import { GameEvent } from "./game-event.entity";

@Entity()
export class CurrentGameEvent {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Game, { nullable: false })
  readonly game: Relation<Game>;

  @ManyToOne(() => GameEvent, { nullable: false })
  readonly gameEvent: Relation<GameEvent>;

  @Column()
  readonly hasBeenTriggered: boolean;
}
