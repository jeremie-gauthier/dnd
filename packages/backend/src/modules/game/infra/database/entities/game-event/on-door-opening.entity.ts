import {
  ChildEntity,
  Column,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  Relation,
  RelationId,
} from "typeorm";
import { GameEventAction } from "../../enums/game-event-action.enum";
import { GameEventName } from "../../enums/game-event-name.enum";
import { Coord } from "../coord.entity";
import { MonsterTemplate } from "../game-entity/playable-entity/template/monster-template.entity";
import { Room } from "../room/room.entity";
import { GameEvent } from "./game-event.entity";

@ChildEntity(GameEventName.ON_DOOR_OPENING)
export class OnDoorOpening extends GameEvent {
  readonly name = GameEventName.ON_DOOR_OPENING;

  @Column({ default: GameEventAction.SPAWN_MONSTERS, update: false })
  readonly action = GameEventAction.SPAWN_MONSTERS;

  @Column(() => Coord)
  readonly doorCoord: Coord;

  @ManyToMany(() => MonsterTemplate)
  @JoinTable()
  readonly monsters: Relation<MonsterTemplate[]>;

  @OneToOne(() => Room)
  @JoinColumn()
  readonly startingRoom: Relation<Room>;

  @RelationId((onDoorOpening: OnDoorOpening) => onDoorOpening.startingRoom)
  readonly roomId: Relation<Room["id"]>;
}
