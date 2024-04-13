import { GameEntity, Tile } from "../../database";
import { NonNegativeNumber } from "../../types";
import { canMoveToRequestedPosition } from "./collision";
import { coordToIndex } from "./coord";
import { getNeighbourCoords } from "./get-neighbours-coords";

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

type Params = {
  map: GameEntity["map"];
  originTile: Tile;
  maxRange: NonNegativeNumber<number>;
};

export function getAllPathsFromTileWithinRange({
  map,
  originTile,
  maxRange,
}: Params): TilePath[] {
  const metadata = { width: map.width, height: map.height };

  const queue: TilePath[] = [];
  const explored: Tile[] = [];
  const paths: TilePath[] = [];

  queue.push({ tile: originTile, range: 0 });
  explored.push(originTile);

  while (queue.length > 0) {
    const tilePath = queue.shift()!;

    // save tile as part of a possible path
    if (tilePath.range > 0) {
      paths.push(tilePath);
    }

    // stop enqueueing more tile if max range has been reached
    if (tilePath.range >= maxRange) {
      continue;
    }

    const neighbourCoords = getNeighbourCoords({ coord: tilePath.tile.coord });

    // browse all linked tiles to create new paths
    for (const neighbourCoord of neighbourCoords) {
      const neighbourTileIdx = coordToIndex({
        coord: neighbourCoord,
        metadata,
      });
      const neighbourTile = map.tiles[neighbourTileIdx];

      // skip invalid tiles
      if (!neighbourTile) {
        continue;
      }

      // skip already explored tiles
      if (explored.includes(neighbourTile)) {
        continue;
      }

      // skip blocked tiles
      if (!canMoveToRequestedPosition({ tile: neighbourTile })) {
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

function hasAncestor(tilePath: TilePath): tilePath is ChildTilePath {
  return tilePath.range > 0;
}

export function unfoldTilePath(tilePath: TilePath): Tile[] {
  const tilePaths: [TilePath] & TilePath[] = [tilePath];

  while (hasAncestor(tilePaths[0])) {
    tilePaths.unshift(tilePaths[0].fromTile);
  }

  return tilePaths.map((tilePath) => tilePath.tile);
}
