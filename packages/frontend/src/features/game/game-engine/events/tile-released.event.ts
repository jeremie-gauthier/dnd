import { Coord } from "@dnd/shared";

export class TileReleasedEvent extends Event {
  public static readonly EventName = "TileReleased";

  constructor(
    public readonly mouseCoord: { x: number; y: number },
    public readonly coord2D: Coord,
  ) {
    super("TileReleased");
  }
}
