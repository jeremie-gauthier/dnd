import { describe, expect, it } from 'vitest';
import { Coord } from '../map/coord';
import {
  ChildTilePath,
  TilePath,
} from '../map/pathfinder/breadth-first-search';
import { Tile } from '../map/tile';
import { unfoldTilePath } from './unfold-tile-path';

describe('utils: unfoldTilePath', () => {
  it('should returns the inorder array of tiles to walk through', () => {
    const tilePath: TilePath = {
      tile: new Tile(Coord.from({ x: 1, y: 1 })),
      range: 2,
      fromTile: {
        tile: new Tile(Coord.from({ x: 0, y: 1 })),
        range: 1,
        fromTile: {
          tile: new Tile(Coord.from({ x: 0, y: 0 })),
          range: 0,
        },
      },
    };

    const result = unfoldTilePath(tilePath);
    const expected = [
      (tilePath.fromTile as ChildTilePath).fromTile.tile,
      tilePath.fromTile.tile,
      tilePath.tile,
    ];

    expect(result).toStrictEqual(expected);
  });
});
