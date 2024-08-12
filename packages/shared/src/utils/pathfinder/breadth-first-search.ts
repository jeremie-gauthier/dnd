import { Coord, PlayableEntity } from "../../database";
import { NonNegativeNumber } from "../../types";
import { canMoveToRequestedPosition } from "./collision";
import { coordToIndex } from "./coord";
import { getNeighbourCoords } from "./get-neighbours-coords";
import { GameBoard, GameBoardTile } from "./pathfinder.interface";

export interface OriginTilePath {
  tile: GameBoardTile;
  range: 0;
}

export interface ChildTilePath {
  tile: GameBoardTile;
  range: number;
  fromTile: TilePath;
}

export type TilePath = OriginTilePath | ChildTilePath;

type Params = {
  ally: PlayableEntity["faction"];
  gameBoard: GameBoard;
  originCoord: Coord;
  maxRange: NonNegativeNumber<number>;
};

export function getAllPathsFromTileWithinRange({
  ally,
  gameBoard,
  originCoord,
  maxRange,
}: Params): TilePath[] {
  const metadata = { width: gameBoard.width, height: gameBoard.height };

  const originTileIdx = coordToIndex({ coord: originCoord, metadata });
  const originTile = gameBoard.tiles[originTileIdx];
  if (!originTile) {
    return [];
  }

  const queue: TilePath[] = [];
  const explored: GameBoardTile[] = [];
  const paths: TilePath[] = [];

  queue.push({ tile: originTile, range: 0 });
  explored.push(originTile);

  while (queue.length > 0) {
    const tilePath = queue.shift()!;

    // save tile as part of a possible path
    if (
      tilePath.range > 0 &&
      tilePath.tile.entities.every((entity) => !entity.isBlocking)
    ) {
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
      const neighbourTile = gameBoard.tiles[neighbourTileIdx];

      // skip invalid tiles
      if (!neighbourTile) {
        continue;
      }

      // skip already explored tiles
      if (explored.includes(neighbourTile)) {
        continue;
      }

      // skip blocked tiles
      if (!canMoveToRequestedPosition({ ally, tile: neighbourTile })) {
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

export function unfoldTilePath(tilePath: TilePath): GameBoardTile[] {
  const tilePaths: [TilePath] & TilePath[] = [tilePath];

  while (hasAncestor(tilePaths[0])) {
    tilePaths.unshift(tilePaths[0].fromTile);
  }

  return tilePaths.map((tilePath) => tilePath.tile);
}

export function getCoordsFromTilePaths(tilePaths: TilePath[]): Coord[] {
  const uniqCoords: Coord[] = [];

  for (const tilePath of tilePaths) {
    const coords = unfoldTilePath(tilePath)
      .filter((tile) => tile.entities.every((entity) => !entity.isBlocking))
      .map((tile) => tile.coord);
    for (const coord of coords) {
      const isNewCoord = uniqCoords.every(
        (existingCoord) =>
          !(
            existingCoord.column === coord.column &&
            existingCoord.row === coord.row
          ),
      );
      if (isNewCoord) {
        uniqCoords.push(coord);
      }
    }
  }

  return uniqCoords;
}
