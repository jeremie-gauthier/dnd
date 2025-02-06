import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { InteractiveEntityKind } from "src/modules/game/infra/database/enums/interactive-entity-kind.enum";
import { TrapName } from "src/modules/game/infra/database/enums/trap-name.enum";
import { TileNonPlayableInteractiveEntityResponseDto } from "./tile-non-playable-interactive-entity.dto";

export class TrapEntityResponseDto extends TileNonPlayableInteractiveEntityResponseDto {
  @Expose()
  @ApiProperty({
    enum: [InteractiveEntityKind.TRAP],
    enumName: "InteractiveEntityKind_Trap",
  })
  override readonly kind = InteractiveEntityKind.TRAP;

  @Expose()
  @ApiProperty({ enum: TrapName, enumName: "TrapName" })
  readonly name = TrapName.PIT;

  @Expose()
  readonly isVisible: boolean;

  @Expose()
  readonly isBlocking: boolean;

  @Expose()
  readonly canInteract: boolean;
}
