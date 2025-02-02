import { CoordResponseDto } from "@/openapi/dnd-api";

export class MoveForbiddenEvent extends Event {
  public static readonly EventName = "MoveForbidden";

  constructor(
    public readonly coordHovered: CoordResponseDto,
    public readonly isometricCoord: CoordResponseDto,
  ) {
    super("MoveForbidden");
  }
}
