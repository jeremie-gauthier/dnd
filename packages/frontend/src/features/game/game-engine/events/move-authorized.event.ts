import { Coord } from "@dnd/shared";

export class MoveAuthorizedEvent extends Event {
  public static readonly EventName = "MoveAuthorized";

  constructor(public readonly isometricCoord: Coord) {
    super("MoveAuthorized");
  }
}
