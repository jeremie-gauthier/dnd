import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
  TableInheritance,
} from "typeorm";
import {
  TileEntityTypeType,
  TileEntityTypeValues,
} from "../../enums/tile-entity-type.enum";
import { Tile } from "../tile.entity";

@Entity()
@TableInheritance({ column: "type" })
export class TileEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({
    type: "enum",
    enum: TileEntityTypeValues,
    enumName: "TileEntityType",
    update: false,
  })
  readonly type: TileEntityTypeType;

  @Column()
  isBlocking: boolean;

  @ManyToOne(() => Tile, { onDelete: "CASCADE", nullable: false })
  readonly tile: Relation<Tile>;
}
