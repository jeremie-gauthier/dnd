import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  RelationId,
  Unique,
} from "typeorm";
import { Board } from "./board.entity";
import { Coord } from "./coord.entity";
import { InteractiveEntity } from "./game-entity/interactive-entity/interactive-entity.entity";
import { NonInteractiveEntity } from "./game-entity/non-interactive-entity/non-interactive-entity.entity";
import { PlayableEntity } from "./game-entity/playable-entity/playable-entity.entity";
import { Room } from "./room/room.entity";

@Entity()
@Unique(["coord.column", "coord.row", "board"])
export class Tile {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column(() => Coord)
  readonly coord: Relation<Coord>;

  @OneToMany(
    () => PlayableEntity,
    (playableEntity) => playableEntity.tile,
    { cascade: true },
  )
  playableEntities: Relation<PlayableEntity[]>;

  @OneToMany(
    () => InteractiveEntity,
    (interactiveEntity) => interactiveEntity.tile,
    { cascade: true },
  )
  interactiveEntities: Relation<InteractiveEntity[]>;

  @OneToMany(
    () => NonInteractiveEntity,
    (nonInteractiveEntity) => nonInteractiveEntity.tile,
    { cascade: true },
  )
  nonInteractiveEntities: Relation<NonInteractiveEntity[]>;

  @Column()
  readonly isStartingTile: boolean;

  @ManyToOne(() => Board, { onDelete: "CASCADE", nullable: false })
  readonly board: Relation<Board>;

  @ManyToOne(
    () => Room,
    (room) => room.tiles,
    { nullable: true },
  )
  readonly room: Relation<Room> | null;

  @RelationId((tile: Tile) => tile.room)
  readonly roomId: Relation<Room["id"]>;
}
