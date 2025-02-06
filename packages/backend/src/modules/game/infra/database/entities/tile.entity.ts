import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  Relation,
  RelationId,
} from "typeorm";
import { TileEntityPersistence } from "../interfaces/tile-entity-persistence.interface";
import { Board } from "./board.entity";
import { Coord } from "./coord.entity";
import { Room } from "./room/room.entity";
import { TileEntity } from "./tile-entity/tile-entity.entity";

@Entity()
export class Tile {
  @Column(() => Coord)
  readonly coord: Coord;

  @OneToMany(
    () => TileEntity,
    (tileEntity) => tileEntity.tile,
    { cascade: true },
  )
  entities: Relation<TileEntityPersistence[]>;

  @Column()
  readonly isStartingTile: boolean;

  @ManyToOne(() => Board, { onDelete: "CASCADE", nullable: false })
  readonly board: Relation<Board>;

  @ManyToOne(
    () => Room,
    (room) => room.tiles,
    { nullable: false },
  )
  readonly room: Relation<Room>;

  @RelationId((tile: Tile) => tile.room)
  readonly roomId: Relation<Room["id"]>;
}
