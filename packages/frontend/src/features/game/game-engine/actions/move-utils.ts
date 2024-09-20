import {
  ChildTilePath,
  Coord,
  TilePath,
  GameBoardTile,
  getNeighbourCoords,
} from "@dnd/shared";

function hasAncestor(tilePath: TilePath): tilePath is ChildTilePath {
  return tilePath.range > 0;
}

function unfoldTilePath(tilePath: TilePath): GameBoardTile[] {
  const tilePaths: [TilePath] & TilePath[] = [tilePath];

  while (hasAncestor(tilePaths[0])) {
    tilePaths.unshift(tilePaths[0].fromTile);
  }

  return tilePaths.map((tilePath) => tilePath.tile);
}

export function getAllCoordsFromTilePaths(tilePaths: TilePath[]): Coord[] {
  const uniqCoords: Coord[] = [];

  for (const tilePath of tilePaths) {
    const coords = unfoldTilePath(tilePath).map((tile) => tile.coord);
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

export function trimConsecutiveNonAccessibleCoordsTail({
  tilePathCoords,
}: { tilePathCoords: Coord[] }) {
  const tilePathCoordsReversed = [...tilePathCoords].reverse();

  let accessibleCoordIdxStart = 0;
  for (let i = 0; i < tilePathCoordsReversed.length; i += 1) {
    const tilePathCoord = tilePathCoordsReversed[i];
    const nextTilePathCoord = tilePathCoordsReversed[i + 1];
    if (!nextTilePathCoord) break;

    const tilePathCoordNeighbours = getNeighbourCoords({
      coord: tilePathCoord,
    });
    const isConsecutiveWithNextCoord = tilePathCoordNeighbours.some(
      ({ row, column }) =>
        row === tilePathCoord.row && column === tilePathCoord.column,
    );
    if (isConsecutiveWithNextCoord) break;

    accessibleCoordIdxStart = i;
  }

  return tilePathCoordsReversed.slice(accessibleCoordIdxStart).reverse();
}
