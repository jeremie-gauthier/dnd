import { Column } from "typeorm";
import {
  InteractiveEntityKindType,
  InteractiveEntityKindValues,
} from "../../../enums/interactive-entity-kind.enum";
import { TileEntityType } from "../../../enums/tile-entity-type.enum";
import { TileEntity } from "../tile-entity.entity";

export class TileNonPlayableInteractiveEntity extends TileEntity {
  @Column({ default: TileEntityType.INTERACTIVE_ENTITY, update: false })
  readonly type = TileEntityType.INTERACTIVE_ENTITY;

  @Column({
    type: "enum",
    enum: InteractiveEntityKindValues,
    enumName: "InteractiveEntityKind",
    update: false,
  })
  readonly kind: InteractiveEntityKindType;

  @Column()
  isVisible: boolean;

  @Column()
  isBlocking: boolean;

  @Column()
  canInteract: boolean;
}
