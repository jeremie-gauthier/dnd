import { ApiProperty } from "@nestjs/swagger";
import { InteractiveEntityKind } from "src/database/enums/interactive-entity-kind.enum";
import { TrapName } from "../../../enums/trap-name.enum";
import { TileNonPlayableInteractiveEntity } from "./tile-non-playable-interactive-entity.entity";

export class TrapEntity extends TileNonPlayableInteractiveEntity {
  readonly kind = InteractiveEntityKind.TRAP;
  @ApiProperty({ enum: TrapName, enumName: "TrapName" })
  readonly name = TrapName.PIT;
  canInteract: boolean;
  isBlocking: boolean;
  isVisible: boolean;
}
