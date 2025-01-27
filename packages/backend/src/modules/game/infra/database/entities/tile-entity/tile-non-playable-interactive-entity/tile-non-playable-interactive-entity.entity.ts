import { ApiProperty } from "@nestjs/swagger";
import {
  InteractiveEntityKind,
  InteractiveEntityKindType,
} from "src/database/enums/interactive-entity-kind.enum";
import { TileEntityType } from "src/database/enums/tile-entity-type.enum";
import { TileEntity } from "../tile-entity.entity";

export abstract class TileNonPlayableInteractiveEntity extends TileEntity {
  readonly type = TileEntityType.INTERACTIVE_ENTITY;

  @ApiProperty({
    enum: InteractiveEntityKind,
    enumName: "InteractiveEntityKind",
  })
  abstract readonly kind: InteractiveEntityKindType;
  abstract isVisible: boolean;
  abstract isBlocking: boolean;
  abstract canInteract: boolean;
}
