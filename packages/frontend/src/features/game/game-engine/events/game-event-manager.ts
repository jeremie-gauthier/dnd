import { Coord, GameItem, GameView, PlayableEntity } from "@dnd/shared";
import { PreparingAttackEvent } from "./preparing-attack.event";
import { TileClickedEvent } from "./tile-clicked.event";
import { TileHoveredEvent } from "./tile-hovered.event";
import { TilePressedEvent } from "./tile-pressed.event";
import { TileReleasedEvent } from "./tile-released.event";

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

  public emitTilePressed(
    mouseCoord: { x: number; y: number },
    isometricCoord: Coord,
  ) {
    this.dispatchEvent(new TilePressedEvent(mouseCoord, isometricCoord));
  }

  public emitTileReleased(
    mouseCoord: { x: number; y: number },
    isometricCoord: Coord,
  ) {
    this.dispatchEvent(new TileReleasedEvent(mouseCoord, isometricCoord));
  }

  public emitPreparingAttack({
    game,
    entityPlaying,
    item,
    attack,
  }: {
    game: GameView;
    entityPlaying: PlayableEntity;
    item: GameItem;
    attack: Extract<GameItem, { type: "Weapon" | "Spell" }>["attacks"][number];
  }) {
    this.dispatchEvent(
      new PreparingAttackEvent(game, entityPlaying, item, attack),
    );
  }
}
