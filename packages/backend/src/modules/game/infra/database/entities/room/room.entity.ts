import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { Tile } from "../tile.entity";
import { BoundingBox } from "./bounding-box.entity";

@Entity()
export class Room {
  @PrimaryColumn("uuid")
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
}
