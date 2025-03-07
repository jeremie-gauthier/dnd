import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
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
  readonly gameTemplate: Relation<GameTemplate>;

  @Column({ type: "json", update: false })
  readonly data: Record<string, unknown>;
}

// ChildEntity(GameEventName.ON_DOOR_OPENING)
// export class OnDoorOpening extends GameEvent {
//   readonly name = GameEventName.ON_DOOR_OPENING;

//   @Column({ default: GameEventAction.SPAWN_MONSTERS, update: false })
//   readonly action = GameEventAction.SPAWN_MONSTERS;

//   @Column(() => Coord)
//   readonly doorCoord: Coord;

//   @ManyToMany(() => MonsterTemplate)
//   @JoinTable()
//   readonly monsters: Relation<MonsterTemplate[]>;

//   @OneToOne(() => Room)
//   @JoinColumn()
//   readonly startingRoom: Relation<Room>;

//   @RelationId((onDoorOpening: OnDoorOpening) => onDoorOpening.startingRoom)
//   readonly roomId: Relation<Room["id"]>;
// }
