import { Coord } from "./coord.entity";
import { TileEntity } from "./tile-entity/tile-entity.entity";

export class Tile {
  coord: Coord;
  entities: Array<TileEntity>;
  isStartingTile: boolean;
}
