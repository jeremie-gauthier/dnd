import type { HeroClassType } from "../enums/hero-class.enum";
import type { EnemyKind } from "./enemy-kind.type";
import { GameEvent } from "./game-event.type";
import { DoorEntity, TrapEntity } from "./interactive-entities.type";
import type { PlayerGamePhase } from "./player-phase.type";

type Player = {
  currentPhase: PlayerGamePhase;
};

type BasePlayableEntity = Player & {
  id: string;

  playedByUserId: string;

  name: string;

  initiative: number;
  coord: Coord;
  isBlocking: boolean;

  characteristic: {
    baseHealthPoints: number;
    healthPoints: number;

    baseManaPoints: number;
    manaPoints: number;

    baseArmorClass: number;
    armorClass: number;

    baseMovementPoints: number;
    movementPoints: number;

    baseActionPoints: number;
    actionPoints: number;
  };
};

export type PlayableEnemyEntity = BasePlayableEntity & {
  type: "enemy";
  kind: EnemyKind;
};

export type PlayableHeroEntity = BasePlayableEntity & {
  type: "hero";
  class: HeroClassType;
  level: number;
};

export type PlayableEntity = PlayableEnemyEntity | PlayableHeroEntity;

export type TilePlayableEntity = {
  type: "playable-entity";
  id: PlayableEntity["id"];
};

export type TileNonPlayableInteractiveEntity = DoorEntity | TrapEntity;

export type TileNonPlayableNonInteractiveEntity = {
  type: "non-playable-non-interactive-entity";
  kind: "wall" | "pillar" | "tree" | "off-map";
  isVisible: true;
  isBlocking: true;
  canInteract: false;
};

export type TileEntity =
  | TilePlayableEntity
  | TileNonPlayableInteractiveEntity
  | TileNonPlayableNonInteractiveEntity;

export type Coord = {
  row: number;
  column: number;
};

export type Tile = {
  coord: Coord;
  entities: TileEntity[];
  isStartingTile?: true;
};

export type Map = {
  width: number;
  height: number;
  tiles: Tile[];
};

export type GameStatus = "prepare_for_battle" | "battle_ongoing";

export type GameEntity<TGameStatus extends GameStatus = GameStatus> = {
  id: string;
  status: TGameStatus;
  map: Map;
  gameMaster: {
    userId: string;
  };
  playableEntities: Record<PlayableEntity["id"], PlayableEntity>;
  timeline: PlayableEntity["id"][];
  events: GameEvent[];
};
