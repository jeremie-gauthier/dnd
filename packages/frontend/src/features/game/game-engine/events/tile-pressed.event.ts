import { CoordResponseDto } from "@/openapi/dnd-api";

export class TilePressedEvent extends Event {
  public static readonly EventName = "TilePressed";

  constructor(
    public readonly mouseCoord: { x: number; y: number },
    public readonly coord2D: CoordResponseDto,
  ) {
    super("TilePressed");
  }
}
