import { PlayableEntityRaceType, PlayableEntityTypeType } from "../enums";
import type { HeroClassType } from "../enums/hero-class.enum";
import { StuffStorageCapacityJson } from "../json";
import { Coord } from "./coord.interface";
import { GameItem } from "./game-item";
import {
  ChestEntity,
  DoorEntity,
  TrapEntity,
} from "./interactive-entities.type";
import type { PlayerGamePhase } from "./player-phase.type";

type PlayableEntityInventory = {
  storageCapacity: StuffStorageCapacityJson;
  gear: GameItem[];
  backpack: GameItem[];
};

type Player = {
  currentPhase: PlayerGamePhase;
};

type BasePlayableEntity = Player & {
  id: string;
  type: PlayableEntityTypeType;
  race: PlayableEntityRaceType;

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
  inventory: PlayableEntityInventory;
};

export type PlayableEnemyEntity = BasePlayableEntity & {
  faction: "monster";
};

export type PlayableHeroEntity = BasePlayableEntity & {
  faction: "hero";
  class: HeroClassType;
  level: number;
  imgUrl: string;
};

export type PlayableEntity = PlayableEnemyEntity | PlayableHeroEntity;

export type TilePlayableEntity = {
  type: "PLAYABLE_ENTITY";
  id: PlayableEntity["id"];
  faction: "hero" | "monster";
  isBlocking: boolean;
};

export type TileNonPlayableInteractiveEntity =
  | DoorEntity
  | TrapEntity
  | ChestEntity;

export type TileNonPlayableNonInteractiveEntity = {
  type: "NON_INTERACTIVE_ENTITY";
  kind: "wall" | "pillar" | "tree" | "off-map";
  isVisible: true;
  isBlocking: true;
  canInteract: false;
};

export type TileEntity =
  | TilePlayableEntity
  | TileNonPlayableInteractiveEntity
  | TileNonPlayableNonInteractiveEntity;

export type Tile = {
  coord: Coord;
  entities: TileEntity[];
  isStartingTile: boolean;
};

export type Map = {
  width: number;
  height: number;
  tiles: Tile[];
};

export type GameStatus = "PREPARE_FOR_BATTLE" | "BATTLE_ONGOING";

export type GameView<TGameStatus extends GameStatus = GameStatus> = {
  id: string;
  status: TGameStatus;
  board: Map;
  gameMaster: {
    userId: string;
  };
  playableEntities: Record<PlayableEntity["id"], PlayableEntity>;
  timeline: PlayableEntity["id"][];
};
