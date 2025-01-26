import { TileNonPlayableInteractiveEntity } from "./tile-non-playable-interactive-entity.entity";

export class DoorEntity extends TileNonPlayableInteractiveEntity {
  kind: "door";
  canInteract: boolean;
  isBlocking: boolean;
  isVisible: boolean;
}
