import { Column, Entity, ManyToOne, OneToMany, Relation } from "typeorm";
import { Board } from "../board.entity";
import { Tile } from "../tile.entity";
import { BoundingBox } from "./bounding-box.entity";

@Entity()
export class Room {
  @Column()
  readonly id: string;

  @Column()
  hasBeenVisited: boolean;

  @OneToMany(
    () => BoundingBox,
    (boundingBox) => boundingBox.room,
    { cascade: true },
  )
  readonly boundingBoxes: Relation<BoundingBox[]>;

  @OneToMany(
    () => Tile,
    (tile) => tile.room,
    { cascade: true },
  )
  readonly tiles: Relation<Tile[]>;

  @ManyToOne(
    () => Board,
    (board) => board.rooms,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly board: Relation<Board>;
}
