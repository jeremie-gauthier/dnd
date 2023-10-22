import { Link } from '../link';
import type { Tile } from '../tile';

type TilePath =
  | {
      tile: Tile;
      range: 0;
    }
  | {
      tile: Tile;
      range: number;
      fromTile: TilePath;
    };

export function getAllPathsFromTileWithinRange(
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

    // browse all linked tiles to create new paths
    for (const link of tilePath.tile.links) {
      // skip already explored tiles
      if (explored.includes(link.tile)) {
        continue;
      }

      if (link.type === Link.Type.Door && link.status === Link.Status.Closed) {
        continue;
      }

      explored.push(link.tile);
      queue.push({
        tile: link.tile,
        range: tilePath.range + 1,
        fromTile: tilePath,
      });
    }
  }

  return paths;
}
