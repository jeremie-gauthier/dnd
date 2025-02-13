import { CoordResponseDto } from "@/openapi/dnd-api";

export class TileReleasedEvent extends Event {
  public static readonly EventName = "TileReleased";

  constructor(
    public readonly mouseCoord: { x: number; y: number },
    public readonly coord2D: CoordResponseDto,
  ) {
    super("TileReleased");
  }
}
