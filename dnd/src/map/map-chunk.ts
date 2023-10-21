import { Tile } from './tile';

export class MapChunk {
  private static SIZE = 11 ** 2;

  public readonly tiles: Tile[];

  constructor() {
    this.tiles = Array.from({ length: MapChunk.SIZE }).map(
      (_, index) => new Tile('free', undefined, `${index}`),
    );
  }
}
