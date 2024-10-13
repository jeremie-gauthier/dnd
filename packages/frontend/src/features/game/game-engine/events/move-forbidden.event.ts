import { Coord } from "@dnd/shared";

export class MoveForbiddenEvent extends Event {
  public static readonly EventName = "MoveForbidden";

  constructor(
    public readonly coordHovered: Coord,
    public readonly isometricCoord: Coord,
  ) {
    super("MoveForbidden");
  }
}
