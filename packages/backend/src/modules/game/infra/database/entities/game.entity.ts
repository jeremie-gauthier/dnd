import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { GameStatusType, GameStatusValues } from "../enums/game-status.enum";
import { PlayableEntityPersistence } from "../interfaces/playable-entity-persistence.interface";
import { Board } from "./board.entity";
import { GameEvent } from "./game-event/game-event.entity";
import { GameMaster } from "./game-master.entity";
import { Host } from "./host.entity";
import { Item } from "./item/item.entity";
import { MonsterKilled } from "./monster-killed.entity";
import { PlayableEntity } from "./playable-entity/playable-entity.entity";
import { WinCondition } from "./win-condition/win-condition.entity";

@Entity()
export class Game {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column(() => Host)
  readonly host: Host;

  @Column({
    type: "enum",
    enum: GameStatusValues,
    enumName: "GameStatus",
  })
  status: GameStatusType;

  @OneToOne(() => Board, { cascade: true })
  @JoinColumn()
  readonly board: Relation<Board>;

  @Column(() => GameMaster)
  readonly gameMaster: Relation<GameMaster>;

  @OneToMany(
    () => PlayableEntity,
    (playableEntity) => playableEntity.game,
    { cascade: true },
  )
  readonly playableEntities: Relation<PlayableEntityPersistence[]>;

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

  @Column({ update: false })
  readonly maxLevelLoot: Item["level"];

  @ManyToMany(() => Item)
  readonly itemsLooted: Relation<Item[]>;

  @OneToMany(
    () => MonsterKilled,
    (monsterKilled) => monsterKilled.game,
    { cascade: true },
  )
  readonly monstersKilled: Relation<MonsterKilled[]>;
}
