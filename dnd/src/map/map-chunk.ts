import { chunk } from '../utils/chunk';
import { Tile } from './tile';

export class MapChunk {
  private static SIZE = 11 ** 2;

  constructor(public readonly tiles = MapChunk.generateEmptyMapChunk()) {}

  private static generateEmptyMapChunk() {
    return Array.from({ length: MapChunk.SIZE }).map(
      (_, index) => new Tile('free', undefined, `${index}`),
    );
  }

  public toString() {
    return chunk(
      this.tiles.map(({ content: { type, entity } }) => {
        if (entity) {
          return entity.type[0]?.toUpperCase();
        } else {
          return type === 'free' ? '0' : '1';
        }
      }),
      11,
    )
      .map((tiles) => tiles.join(' '))
      .join('\n');
  }
}
