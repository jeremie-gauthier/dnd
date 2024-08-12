import { Coord } from "./coord.type";
import { TileInteractiveEntity } from "./tile-entity/interactive.type";
import { TileNonInteractiveEntity } from "./tile-entity/non-interactive.type";
import { TilePlayableEntity } from "./tile-entity/playable.type";

type Tile = {
  coord: Coord;
  entities: Array<
    TilePlayableEntity | TileInteractiveEntity | TileNonInteractiveEntity
  >;
  isStartingTile?: true;
};

export type Board = {
  width: number;
  height: number;
  tiles: Array<Tile>;
};
