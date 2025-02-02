import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  NonInteractiveEntityKind,
  NonInteractiveEntityKindType,
} from "src/database/enums/non-interactive-entity-kind.enum";
import { TileEntityType } from "src/database/enums/tile-entity-type.enum";
import { TileEntityResponseDto } from "./tile-entity.dto";

export class TileNonPlayableNonInteractiveEntityResponseDto extends TileEntityResponseDto {
  @Expose()
  @ApiProperty({
    enum: [TileEntityType.NON_INTERACTIVE_ENTITY],
    enumName: "TileEntityType_NonInteractiveEntity",
  })
  override readonly type = TileEntityType.NON_INTERACTIVE_ENTITY;

  @Expose()
  @ApiProperty({
    enum: NonInteractiveEntityKind,
    enumName: "NonInteractiveEntityKind",
  })
  readonly kind: NonInteractiveEntityKindType;

  @Expose()
  readonly isVisible: boolean;

  @Expose()
  readonly isBlocking: boolean;

  @Expose()
  readonly canInteract: boolean;
}
