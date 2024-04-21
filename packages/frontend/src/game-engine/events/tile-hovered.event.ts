import { Coord } from "@dnd/shared";

export class TileHoveredEvent extends Event {
  constructor(
    public readonly mouseCoord: { x: number; y: number },
    public readonly isometricCoord: Coord,
  ) {
    super("TileHovered");
  }
}
