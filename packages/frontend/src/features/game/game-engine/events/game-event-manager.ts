import { Coord, GameItem, GameView, PlayableEntity, Tile } from "@dnd/shared";
import {
  Interaction,
  InteractionsAuthorizedEvent,
} from "./interactions-authorized.event";
import { ItemFoundEvent } from "./item-found.event";
import { MoveAuthorizedEvent } from "./move-authorized.event";
import { MoveForbiddenEvent } from "./move-forbidden.event";
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

  public emitTileHovered(mouseCoord: { x: number; y: number }, coord2D: Coord) {
    if (this.isNewCoord(coord2D)) {
      this.lastIsometricCoordHovered = coord2D;
      this.dispatchEvent(new TileHoveredEvent(mouseCoord, coord2D));
    }
  }

  public emitTileClicked(mouseCoord: { x: number; y: number }, coord2D: Coord) {
    this.dispatchEvent(new TileClickedEvent(mouseCoord, coord2D));
  }

  public emitTilePressed(mouseCoord: { x: number; y: number }, coord2D: Coord) {
    this.dispatchEvent(new TilePressedEvent(mouseCoord, coord2D));
  }

  public emitTileReleased(
    mouseCoord: { x: number; y: number },
    coord2D: Coord,
  ) {
    this.dispatchEvent(new TileReleasedEvent(mouseCoord, coord2D));
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

  public emitMoveForbidden({
    coordHovered,
    isometricCoord,
  }: {
    coordHovered: Coord;
    isometricCoord: Coord;
  }) {
    this.dispatchEvent(new MoveForbiddenEvent(coordHovered, isometricCoord));
  }

  public emitMoveAuthorized({
    isometricCoord,
  }: {
    isometricCoord: Coord;
  }) {
    this.dispatchEvent(new MoveAuthorizedEvent(isometricCoord));
  }

  public emitInteractionsAuthorized({
    isometricCoord,
    tile,
    interactions,
  }: {
    isometricCoord: Coord;
    tile: Tile;
    interactions: Array<Interaction>;
  }) {
    this.dispatchEvent(
      new InteractionsAuthorizedEvent(isometricCoord, tile, interactions),
    );
  }

  public emitItemFound({
    itemFound,
  }: {
    itemFound: GameItem;
  }) {
    this.dispatchEvent(new ItemFoundEvent(itemFound));
  }
}
