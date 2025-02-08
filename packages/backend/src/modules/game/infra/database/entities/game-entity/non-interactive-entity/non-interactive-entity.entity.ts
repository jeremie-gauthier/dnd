import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import {
  NonInteractiveEntityKindType,
  NonInteractiveEntityKindValues,
} from "../../../enums/non-interactive-entity-kind.enum";
import { EntityType } from "../../../enums/tile-entity-type.enum";
import { Tile } from "../../tile.entity";

@Entity()
export class NonInteractiveEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  readonly type = EntityType.NON_INTERACTIVE_ENTITY;

  @ManyToOne(() => Tile, { onDelete: "CASCADE", nullable: false })
  readonly tile: Relation<Tile>;

  @Column({ type: "enum", enum: NonInteractiveEntityKindValues, update: false })
  readonly kind: NonInteractiveEntityKindType;

  @Column()
  isVisible: true;

  @Column()
  isBlocking: true;

  @Column()
  canInteract: false;
}
