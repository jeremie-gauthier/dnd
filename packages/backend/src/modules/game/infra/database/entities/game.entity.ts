import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { GameStatusType, GameStatusValues } from "../enums/game-status.enum";
import { Board } from "./board.entity";
import { CurrentGameEvent } from "./game-event/current-game-event.entity";
import { GameMaster } from "./game-master.entity";
import { Host } from "./host.entity";
import { Item } from "./item/item.entity";
import { WinCondition } from "./win-condition/win-condition.entity";

@Entity()
export class Game {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column(() => Host)
  readonly host: Host;

  @Column({ type: "enum", enum: GameStatusValues })
  status: GameStatusType;

  @OneToOne(() => Board, { cascade: true })
  @JoinColumn()
  readonly board: Relation<Board>;

  @Column(() => GameMaster)
  readonly gameMaster: Relation<GameMaster>;

  @OneToMany(
    () => CurrentGameEvent,
    (currentGameEvent) => currentGameEvent.game,
    { cascade: true },
  )
  readonly events: Relation<CurrentGameEvent[]>;

  @OneToMany(
    () => WinCondition,
    (winCondition) => winCondition.game,
    { cascade: true },
  )
  readonly winConditions: Relation<WinCondition[]>;

  @Column({ update: false })
  readonly maxLevelLoot: number;

  @ManyToMany(() => Item)
  @JoinTable()
  readonly itemsLooted: Relation<Item[]>;
}
