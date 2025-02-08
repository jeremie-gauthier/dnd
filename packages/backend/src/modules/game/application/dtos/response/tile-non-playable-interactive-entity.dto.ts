import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  InteractiveEntityKind,
  InteractiveEntityKindType,
} from "src/modules/game/infra/database/enums/interactive-entity-kind.enum";
import { EntityType } from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { TileEntityResponseDto } from "./tile-entity.dto";

export class TileNonPlayableInteractiveEntityResponseDto extends TileEntityResponseDto {
  @Expose()
  @ApiProperty({
    enum: [EntityType.INTERACTIVE_ENTITY],
    enumName: "TileEntityType_InteractiveEntity",
  })
  override readonly type = EntityType.INTERACTIVE_ENTITY;

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
