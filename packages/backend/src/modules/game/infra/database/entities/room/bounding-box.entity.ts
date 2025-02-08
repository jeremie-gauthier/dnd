import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { Coord } from "../coord.entity";
import { Room } from "./room.entity";

@Entity()
export class BoundingBox {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column(() => Coord)
  readonly topLeft: Relation<Coord>;

  @Column(() => Coord)
  readonly bottomRight: Relation<Coord>;

  @ManyToOne(() => Room, { onDelete: "CASCADE", nullable: false })
  readonly room: Relation<Room>;
}
