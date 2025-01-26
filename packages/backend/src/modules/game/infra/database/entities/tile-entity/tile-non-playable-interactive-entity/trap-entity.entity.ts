import { TileNonPlayableInteractiveEntity } from "./tile-non-playable-interactive-entity.entity";

export class TrapEntity extends TileNonPlayableInteractiveEntity {
  kind: "trap";
  name: "pit";
  canInteract: boolean;
  isBlocking: boolean;
  isVisible: boolean;
}
