import { CoordResponseDto } from "@/openapi/dnd-api";

export class TileClickedEvent extends Event {
  public static readonly EventName = "TileClicked";

  constructor(
    public readonly mouseCoord: { x: number; y: number },
    public readonly coord2D: CoordResponseDto,
  ) {
    super("TileClicked");
  }
}
