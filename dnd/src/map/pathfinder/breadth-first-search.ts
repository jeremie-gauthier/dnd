import { Coord } from '../coord';
import type { Map } from '../map';
import type { Tile } from '../tile';

export interface OriginTilePath {
  tile: Tile;
  range: 0;
}

export interface ChildTilePath {
  tile: Tile;
  range: number;
  fromTile: TilePath;
}

export type TilePath = OriginTilePath | ChildTilePath;

export function getAllPathsFromTileWithinRange(
  map: Map,
  originTile: Tile,
  maxRange: number,
) {
  const queue: TilePath[] = [];
  const explored: Tile[] = [];
  const paths: TilePath[] = [];

  queue.push({ tile: originTile, range: 0 });
  explored.push(originTile);

  while (queue.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tilePath = queue.shift()!;

    // save tile as part of a possible path
    if (tilePath.range > 0) {
      paths.push(tilePath);
    }

    // stop enqueueing more tile if max range has been reached
    if (tilePath.range >= maxRange) {
      continue;
    }

    const tileCoord = tilePath.tile.coord;
    const neighbourCoords = [
      Coord.from({ ...tileCoord, x: tileCoord.x - 1 }),
      Coord.from({ ...tileCoord, x: tileCoord.x + 1 }),
      Coord.from({ ...tileCoord, y: tileCoord.y - 1 }),
      Coord.from({ ...tileCoord, y: tileCoord.y + 1 }),
    ];

    // browse all linked tiles to create new paths
    for (const neighbourCoord of neighbourCoords) {
      const neighbourTile = map.getTileAtCoord(neighbourCoord);

      // skip invalid tiles
      if (!neighbourTile) {
        continue;
      }

      // skip already explored tiles
      if (explored.includes(neighbourTile)) {
        continue;
      }

      // skip blocked tiles
      if (neighbourTile.isBlockedByEntity()) {
        continue;
      }

      explored.push(neighbourTile);
      queue.push({
        tile: neighbourTile,
        range: tilePath.range + 1,
        fromTile: tilePath,
      });
    }
  }

  return paths;
}
