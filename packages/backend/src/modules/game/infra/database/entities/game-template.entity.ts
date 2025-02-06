import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { Board } from "./board.entity";
import { GameEvent } from "./game-event/game-event.entity";
import { WinCondition } from "./win-condition/win-condition.entity";

@Entity()
export class GameTemplate {
  @PrimaryColumn()
  readonly campaignId: string;

  @OneToOne(() => Board, { cascade: true })
  @JoinColumn()
  readonly board: Board;

  @OneToMany(
    () => GameEvent,
    (gameEvent) => gameEvent.game,
    { cascade: true },
  )
  readonly events: Relation<GameEvent[]>;

  @OneToMany(
    () => WinCondition,
    (winCondition) => winCondition.game,
    { cascade: true },
  )
  readonly winConditions: Relation<WinCondition[]>;
}
