import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { InteractiveEntityKind } from "src/database/enums/interactive-entity-kind.enum";
import { TileNonPlayableInteractiveEntityResponseDto } from "./tile-non-playable-interactive-entity.dto";

export class ChestEntityResponseDto extends TileNonPlayableInteractiveEntityResponseDto {
  @Expose()
  @ApiProperty({
    enum: [InteractiveEntityKind.CHEST],
    enumName: "InteractiveEntityKind_Chest",
  })
  override readonly kind = InteractiveEntityKind.CHEST;

  @Expose()
  readonly isVisible: boolean;

  @Expose()
  readonly isBlocking: boolean;

  @Expose()
  readonly canInteract: boolean;
}
