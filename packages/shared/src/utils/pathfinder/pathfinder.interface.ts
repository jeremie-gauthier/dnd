import { Coord } from "../../database/game/coord.interface";

type GameBoardTileNonPlayableEntity = {
  type: "interactive-entity" | "non-interactive-entity";
  isBlocking: boolean;
};

type GameBoardTilePlayableEntity = {
  id: string;
  type: "playable-entity";
  faction: "hero" | "monster";
  isBlocking: boolean;
};

export type GameBoardTileEntity =
  | GameBoardTilePlayableEntity
  | GameBoardTileNonPlayableEntity;

export type GameBoardTile = {
  coord: Coord;
  entities: Array<GameBoardTileEntity>;
};

export type GameBoard = {
  height: number;
  width: number;
  tiles: Array<GameBoardTile>;
};
