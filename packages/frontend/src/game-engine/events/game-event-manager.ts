import { Coord } from "@dnd/shared";
import { TileClickedEvent } from "./tile-clicked.event";
import { TileHoveredEvent } from "./tile-hovered.event";

export class GameEventManager extends EventTarget {
  private static instance?: GameEventManager;
  private lastIsometricCoordHovered?: Coord;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!GameEventManager.instance) {
      GameEventManager.instance = new GameEventManager();
    }

    return GameEventManager.instance;
  }

  private isNewCoord(coord: Coord): boolean {
    if (!this.lastIsometricCoordHovered) {
      return true;
    }

    return !(
      this.lastIsometricCoordHovered.column === coord.column &&
      this.lastIsometricCoordHovered.row === coord.row
    );
  }

  public emitTileHovered(
    mouseCoord: { x: number; y: number },
    isometricCoord: Coord,
  ) {
    if (this.isNewCoord(isometricCoord)) {
      this.lastIsometricCoordHovered = isometricCoord;
      this.dispatchEvent(new TileHoveredEvent(mouseCoord, isometricCoord));
    }
  }

  public emitTileClicked(
    mouseCoord: { x: number; y: number },
    isometricCoord: Coord,
  ) {
    this.dispatchEvent(new TileClickedEvent(mouseCoord, isometricCoord));
  }
}
