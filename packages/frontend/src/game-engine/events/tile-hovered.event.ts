import { Coord } from "@dnd/shared";

export class TileHoveredEvent extends Event {
  public static readonly EventName = "TileHovered";

  constructor(
    public readonly mouseCoord: { x: number; y: number },
    public readonly isometricCoord: Coord,
  ) {
    super("TileHovered");
  }
}
