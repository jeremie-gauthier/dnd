import { chunk } from '../utils/chunk';
import { Tile } from './tile';

export class Map {
  public tiles: Tile[][];

  constructor(
    private readonly width: number,
    private readonly height: number,
    tiles: Tile[],
  ) {
    this.tiles = chunk(tiles, width);
  }

  public toString() {
    return this.tiles
      .map((row) => row.map((tile) => tile.toString()).join('  '))
      .join('\n\n');
  }
}
