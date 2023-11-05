import type {
  ChildTilePath,
  TilePath,
} from '../map/pathfinder/breadth-first-search';
import type { Tile } from '../map/tile';

function hasAncestor(tilePath: TilePath): tilePath is ChildTilePath {
  return tilePath.hasOwnProperty('fromTile');
}

export function unfoldTilePath(tilePath: TilePath): Tile[] {
  const tilePaths: [TilePath] & TilePath[] = [tilePath];

  while (hasAncestor(tilePaths[0])) {
    tilePaths.unshift(tilePaths[0].fromTile);
  }

  return tilePaths.map((tilePath) => tilePath.tile);
}
