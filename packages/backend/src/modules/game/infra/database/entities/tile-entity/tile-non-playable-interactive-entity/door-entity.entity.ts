import { InteractiveEntityKind } from "src/database/enums/interactive-entity-kind.enum";
import { TileNonPlayableInteractiveEntity } from "./tile-non-playable-interactive-entity.entity";

export class DoorEntity extends TileNonPlayableInteractiveEntity {
  readonly kind = InteractiveEntityKind.DOOR;
  canInteract: boolean;
  isBlocking: boolean;
  isVisible: boolean;
}
