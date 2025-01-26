import { TileEntity } from "../tile-entity.entity";

export abstract class TileNonPlayableInteractiveEntity extends TileEntity {
  type: "interactive-entity";
  abstract kind: "door" | "trap" | "chest";
  abstract isVisible: boolean;
  abstract isBlocking: boolean;
  abstract canInteract: boolean;
}
