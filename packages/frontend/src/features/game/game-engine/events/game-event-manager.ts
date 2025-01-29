import {
  AttackResponseDto,
  CoordResponseDto,
  GameResponseDto,
  SpellResponseDto,
  Tile,
  WeaponResponseDto,
} from "@/openapi/dnd-api";
import { Item } from "@features/game/interfaces/dnd-api/item.interface";
import { PlayableEntity } from "@features/game/interfaces/dnd-api/playable-entity.interface";
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
  private lastIsometricCoordHovered?: CoordResponseDto;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!GameEventManager.instance) {
      GameEventManager.instance = new GameEventManager();
    }

    return GameEventManager.instance;
  }

  private isNewCoord(coord: CoordResponseDto): boolean {
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
    coord2D: CoordResponseDto,
  ) {
    if (this.isNewCoord(coord2D)) {
      this.lastIsometricCoordHovered = coord2D;
      this.dispatchEvent(new TileHoveredEvent(mouseCoord, coord2D));
    }
  }

  public emitTileClicked(
    mouseCoord: { x: number; y: number },
    coord2D: CoordResponseDto,
  ) {
    this.dispatchEvent(new TileClickedEvent(mouseCoord, coord2D));
  }

  public emitTilePressed(
    mouseCoord: { x: number; y: number },
    coord2D: CoordResponseDto,
  ) {
    this.dispatchEvent(new TilePressedEvent(mouseCoord, coord2D));
  }

  public emitTileReleased(
    mouseCoord: { x: number; y: number },
    coord2D: CoordResponseDto,
  ) {
    this.dispatchEvent(new TileReleasedEvent(mouseCoord, coord2D));
  }

  public emitPreparingAttack({
    game,
    entityPlaying,
    item,
    attack,
  }: {
    game: GameResponseDto;
    entityPlaying: PlayableEntity;
    item: WeaponResponseDto | SpellResponseDto;
    attack: AttackResponseDto;
  }) {
    this.dispatchEvent(
      new PreparingAttackEvent(game, entityPlaying, item, attack),
    );
  }

  public emitMoveForbidden({
    coordHovered,
    isometricCoord,
  }: {
    coordHovered: CoordResponseDto;
    isometricCoord: CoordResponseDto;
  }) {
    this.dispatchEvent(new MoveForbiddenEvent(coordHovered, isometricCoord));
  }

  public emitMoveAuthorized({
    isometricCoord,
  }: {
    isometricCoord: CoordResponseDto;
  }) {
    this.dispatchEvent(new MoveAuthorizedEvent(isometricCoord));
  }

  public emitInteractionsAuthorized({
    isometricCoord,
    tile,
    interactions,
  }: {
    isometricCoord: CoordResponseDto;
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
    itemFound: Item;
  }) {
    this.dispatchEvent(new ItemFoundEvent(itemFound));
  }
}
