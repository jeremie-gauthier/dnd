import { TileEntity } from "../tile-entity.entity";

export abstract class TileNonPlayableNonInteractiveEntity extends TileEntity {
  type: "non-interactive-entity";
  kind: "wall" | "pillar" | "tree" | "off-map";
  isVisible: true;
  isBlocking: true;
  canInteract: false;
}
