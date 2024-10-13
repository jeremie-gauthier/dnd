import { Coord } from "@dnd/shared";

export class TileHoveredEvent extends Event {
  public static readonly EventName = "TileHovered";

  constructor(
    public readonly mouseCoord: { x: number; y: number },
    public readonly coord2D: Coord,
  ) {
    super("TileHovered");
  }
}
