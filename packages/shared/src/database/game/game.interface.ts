import { HeroClassType } from "../enums/hero-class.enum";
import { EnemyKind } from "./enemy-kind.type";

type BasePlayableEntity = {
  id: string;

  playedByUserId: string;

  name: string;

  initiative: number;
  coord: Coord;
  isBlocking: boolean;

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

export type TileNonPlayableInteractiveEntity = {
  type: "non-playable-interactive-entity";
  kind: "door" | "trap";
  isVisible: boolean;
  isBlocking: boolean;
  canInteract: boolean;
};

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

export type GameEntity = {
  id: string;
  map: Map;
  playableEntities: Record<PlayableEntity["id"], PlayableEntity>;
  timeline: PlayableEntity["id"][];
};
