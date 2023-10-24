import { Coord } from '../interfaces/coord.interface';
import { chunk } from '../utils/chunk';
import { Tile } from './tile';

export class Map {
  public tiles: Tile[][];

  constructor(
    public readonly width: number,
    public readonly height: number,
    tiles: Tile[],
  ) {
    this.tiles = chunk(tiles, width);
  }

  public isCoordInMap(coord: Coord) {
    return this.getTileAtCoord(coord) !== undefined;
  }

  public getTileAtCoord({ x, y }: Coord) {
    return this.tiles[y]?.[x];
  }

  public toString() {
    return this.tiles
      .map((row) => row.map((tile) => tile.toString()).join(' '))
      .join('\n');
  }
}
