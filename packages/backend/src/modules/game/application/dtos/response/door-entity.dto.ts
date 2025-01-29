import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { InteractiveEntityKind } from "src/database/enums/interactive-entity-kind.enum";
import { TileNonPlayableInteractiveEntityResponseDto } from "./tile-non-playable-interactive-entity.dto";

export class DoorEntityResponseDto extends TileNonPlayableInteractiveEntityResponseDto {
  @Expose()
  @ApiProperty({
    enum: [InteractiveEntityKind.DOOR],
    enumName: "InteractiveEntityKind_Door",
  })
  override readonly kind = InteractiveEntityKind.DOOR;

  @Expose()
  readonly isVisible: boolean;

  @Expose()
  readonly isBlocking: boolean;

  @Expose()
  readonly canInteract: boolean;
}
