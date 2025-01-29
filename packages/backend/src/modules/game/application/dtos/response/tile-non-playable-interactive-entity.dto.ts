import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  InteractiveEntityKind,
  InteractiveEntityKindType,
} from "src/database/enums/interactive-entity-kind.enum";
import { TileEntityType } from "src/database/enums/tile-entity-type.enum";
import { TileEntityResponseDto } from "./tile-entity.dto";

export class TileNonPlayableInteractiveEntityResponseDto extends TileEntityResponseDto {
  @Expose()
  @ApiProperty({
    enum: [TileEntityType.INTERACTIVE_ENTITY],
    enumName: "TileEntityType_InteractiveEntity",
  })
  override readonly type = TileEntityType.INTERACTIVE_ENTITY;

  @Expose()
  @ApiProperty({
    enum: InteractiveEntityKind,
    enumName: "InteractiveEntityKind",
  })
  readonly kind: InteractiveEntityKindType;

  @Expose()
  readonly isVisible: boolean;

  @Expose()
  readonly isBlocking: boolean;

  @Expose()
  readonly canInteract: boolean;
}
