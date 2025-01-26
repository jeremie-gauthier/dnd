export abstract class TileEntity {
  abstract type:
    | "non-interactive-entity"
    | "playable-entity"
    | "interactive-entity";
  abstract isBlocking: boolean;
}
