import { TileEntityType } from "src/database/enums/tile-entity-type.enum";
import { TileEntity } from "../tile-entity.entity";

export abstract class TileNonPlayableNonInteractiveEntity extends TileEntity {
  readonly type = TileEntityType.NON_INTERACTIVE_ENTITY;
  kind: "wall" | "pillar" | "tree" | "off-map";
  isVisible: true;
  isBlocking: true;
  canInteract: false;
}
