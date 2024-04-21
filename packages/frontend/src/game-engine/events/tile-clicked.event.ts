import { Coord } from "@dnd/shared";

export class TileClickedEvent extends Event {
  constructor(
    public readonly mouseCoord: { x: number; y: number },
    public readonly isometricCoord: Coord,
  ) {
    super("TileClicked");
  }
}
