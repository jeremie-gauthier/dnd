import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
  TableInheritance,
} from "typeorm";
import {
  InteractiveEntityKindType,
  InteractiveEntityKindValues,
} from "../../../enums/interactive-entity-kind.enum";
import { EntityType } from "../../../enums/tile-entity-type.enum";
import { Tile } from "../../tile.entity";

@Entity()
@TableInheritance({ column: "kind" })
export class InteractiveEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  readonly type = EntityType.INTERACTIVE_ENTITY;

  @ManyToOne(() => Tile, { onDelete: "CASCADE", nullable: false })
  readonly tile: Relation<Tile>;

  @Column({ type: "enum", enum: InteractiveEntityKindValues, update: false })
  readonly kind: InteractiveEntityKindType;

  @Column()
  isVisible: boolean;

  @Column()
  isBlocking: boolean;

  @Column()
  canInteract: boolean;
}
