import { Column, Entity, OneToMany, Relation } from "typeorm";
import { Room } from "./room/room.entity";
import { Tile } from "./tile.entity";

@Entity()
export class Board {
  @Column()
  readonly width: number;

  @Column()
  readonly height: number;

  @OneToMany(
    () => Tile,
    (tile) => tile.board,
    { cascade: true },
  )
  readonly tiles: Relation<Tile[]>;

  @OneToMany(
    () => Room,
    (room) => room.board,
    { cascade: true },
  )
  readonly rooms: Relation<Room[]>;
}
