import { CoordResponseDto } from "@/openapi/dnd-api";

export class MoveAuthorizedEvent extends Event {
  public static readonly EventName = "MoveAuthorized";

  constructor(public readonly isometricCoord: CoordResponseDto) {
    super("MoveAuthorized");
  }
}
