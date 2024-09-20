import { Coord } from "@dnd/shared";

export class TilePressedEvent extends Event {
  public static readonly EventName = "TilePressed";

  constructor(
    public readonly mouseCoord: { x: number; y: number },
    public readonly isometricCoord: Coord,
  ) {
    super("TilePressed");
  }
}
