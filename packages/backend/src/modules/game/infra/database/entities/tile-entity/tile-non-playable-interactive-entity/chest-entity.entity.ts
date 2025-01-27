import { InteractiveEntityKind } from "src/database/enums/interactive-entity-kind.enum";
import { TileNonPlayableInteractiveEntity } from "./tile-non-playable-interactive-entity.entity";

export class ChestEntity extends TileNonPlayableInteractiveEntity {
  readonly kind = InteractiveEntityKind.CHEST;
  canInteract: boolean;
  isBlocking: boolean;
  isVisible: boolean;
}
