import { TileNonPlayableInteractiveEntity } from "./tile-non-playable-interactive-entity.entity";

export class ChestEntity extends TileNonPlayableInteractiveEntity {
  kind: "chest";
  canInteract: boolean;
  isBlocking: boolean;
  isVisible: boolean;
}
