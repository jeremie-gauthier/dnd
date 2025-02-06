import { ChildEntity, Column } from "typeorm";
import {
  NonInteractiveEntityKindType,
  NonInteractiveEntityKindValues,
} from "../../../enums/non-interactive-entity-kind.enum";
import { TileEntityType } from "../../../enums/tile-entity-type.enum";
import { TileEntity } from "../tile-entity.entity";

@ChildEntity()
export class TileNonPlayableNonInteractiveEntity extends TileEntity {
  @Column({ default: TileEntityType.NON_INTERACTIVE_ENTITY, update: false })
  readonly type = TileEntityType.NON_INTERACTIVE_ENTITY;

  @Column({
    type: "enum",
    enum: NonInteractiveEntityKindValues,
    enumName: "NonInteractiveEntityKind",
    update: false,
  })
  readonly kind: NonInteractiveEntityKindType;

  @Column()
  isVisible: true;

  @Column()
  isBlocking: true;

  @Column()
  canInteract: false;
}
