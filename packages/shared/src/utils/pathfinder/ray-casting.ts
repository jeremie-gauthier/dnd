import { AttackRangeType, Coord, PlayableEntity } from "../../database";
import {
  isBlockedByNonAllyEntity,
  isBlockedByNonPlayableEntity,
} from "./collision";
import { coordToIndex } from "./coord";
import { getNeighbourCoords } from "./get-neighbours-coords";
import { GameBoard, GameBoardTile } from "./pathfinder.interface";

function almostEqual(a: number, b: number) {
  return Math.abs(a - b) < 0.000_001;
}

function makeRay(xStart: number, yStart: number, xEnd: number, yEnd: number) {
  // constant throughout raycast
  const xDirection = xEnd - xStart;
  const yDirection = yEnd - yStart;
  const tForOneX = Math.abs(1 / xDirection);
  const tForOneY = Math.abs(1 / yDirection);
  const yStep = yDirection >= 0 ? 1 : -1;
  const xStep = xDirection >= 0 ? 1 : -1;

  let tValue = 0;
  let xGrid = Math.floor(xStart);
  let yGrid = Math.floor(yStart);

  const fracStartPosX = xStart - Math.floor(xStart);
  let tForNextBorderX =
    xDirection > 0 ? (1 - fracStartPosX) * tForOneX : fracStartPosX * tForOneX;

  const fracStartPosY = yStart - Math.floor(yStart);
  let tForNextBorderY =
    yDirection > 0 ? (1 - fracStartPosY) * tForOneY : fracStartPosY * tForOneY;

  function hasNext() {
    return tValue <= 1;
  }

  function next(): Coord {
    // store this position to return, then advance to next step
    const toReturn = { x: xGrid, y: yGrid };

    if (almostEqual(tForNextBorderX, tForNextBorderY)) {
      // diagonal step (normally not included in a raycast)
      tValue = tForNextBorderX;
      tForNextBorderX += tForOneX;
      tForNextBorderY += tForOneY;
      xGrid += xStep;
      yGrid += yStep;
    } else if (tForNextBorderX <= tForNextBorderY) {
      // step in x
      tValue = tForNextBorderX;
      tForNextBorderX += tForOneX;
      xGrid += xStep;
    } else {
      // step in y
      tValue = tForNextBorderY;
      tForNextBorderY += tForOneY;
      yGrid += yStep;
    }

    return {
      row: toReturn.y,
      column: toReturn.x,
    };
  }

  return {
    next: next,
    hasNext: hasNext,
  };
}

function canBeSeenRay({
  ally,
  gameBoard,
  originCoord,
  destinationTile,
  metadata,
}: {
  ally: PlayableEntity["faction"];
  gameBoard: GameBoard;
  originCoord: Coord;
  destinationTile: GameBoardTile;
  metadata: { height: number; width: number };
}) {
  if (isBlockedByNonPlayableEntity({ tile: destinationTile })) {
    return false;
  }

  const ray = makeRay(
    originCoord.column + 0.5,
    originCoord.row + 0.5,
    destinationTile.coord.column + 0.5,
    destinationTile.coord.row + 0.5,
  );
  while (ray.hasNext()) {
    const nextCoord = ray.next();
    const tileIdx = coordToIndex({ coord: nextCoord, metadata });
    const tile = gameBoard.tiles[tileIdx];

    if (!tile || isBlockedByNonPlayableEntity({ tile })) {
      return false;
    }

    if (isBlockedByNonAllyEntity({ tile, ally })) {
      // stop line of sight the first "non-ally" encountered
      return !ray.hasNext();
    }
  }

  return true;
}

function canAttackTile({ tile }: { tile: GameBoardTile }) {
  return tile.entities.every(
    (entity) => entity.type !== "non-interactive-entity",
  );
}

function getTilesToTest({
  gameBoard,
  originCoord,
  range,
  metadata,
}: {
  gameBoard: GameBoard;
  originCoord: Coord;
  range: AttackRangeType;
  metadata: { height: number; width: number };
}) {
  const meleeCoords = getNeighbourCoords({ coord: originCoord });
  const meleeTiles = meleeCoords
    .map((meleeCoord) => {
      const tileIdx = coordToIndex({ coord: meleeCoord, metadata });
      return gameBoard.tiles[tileIdx];
    })
    .filter((tile) => tile !== undefined);

  if (range === "melee") {
    return meleeTiles.filter((meleeTile) => canAttackTile({ tile: meleeTile }));
  }

  const tilesToTest = gameBoard.tiles.filter(
    (tile) =>
      (tile.coord.row !== originCoord.row ||
        tile.coord.column !== originCoord.column) &&
      canAttackTile({ tile }),
  );

  if (range === "long") {
    return tilesToTest.filter((tileToTest) => !meleeTiles.includes(tileToTest));
  }

  return tilesToTest;
}

export function getLineOfSight({
  ally,
  gameBoard,
  originCoord,
  range,
}: {
  ally: PlayableEntity["faction"];
  gameBoard: GameBoard;
  originCoord: Coord;
  range: AttackRangeType;
}) {
  const metadata = { height: gameBoard.height, width: gameBoard.width };
  const tilesToTest = getTilesToTest({
    gameBoard,
    originCoord,
    range,
    metadata,
  });

  const tilesInSight: GameBoardTile[] = [];
  for (const tile of tilesToTest) {
    if (
      canBeSeenRay({
        ally,
        gameBoard,
        originCoord,
        destinationTile: tile,
        metadata,
      })
    ) {
      tilesInSight.push(tile);
    }
  }

  return tilesInSight;
}

export function canAttackTarget({
  ally,
  gameBoard,
  attackerCoord,
  range,
  targetCoord,
}: {
  ally: PlayableEntity["faction"];
  gameBoard: GameBoard;
  attackerCoord: Coord;
  range: AttackRangeType;
  targetCoord: Coord;
}): boolean {
  if (
    range === "melee" &&
    getNeighbourCoords({ coord: attackerCoord }).every(
      (coord) =>
        !(coord.row === targetCoord.row && coord.column === targetCoord.column),
    )
  ) {
    return false;
  }

  if (
    range === "long" &&
    [attackerCoord, ...getNeighbourCoords({ coord: attackerCoord })].some(
      (coord) =>
        coord.row === targetCoord.row && coord.column === targetCoord.column,
    )
  ) {
    return false;
  }

  const metadata = { height: gameBoard.height, width: gameBoard.width };

  const destinationTileIdx = coordToIndex({ coord: targetCoord, metadata });
  const destinationTile = gameBoard.tiles[destinationTileIdx];
  if (!destinationTile) {
    return false;
  }

  return canBeSeenRay({
    ally,
    gameBoard,
    originCoord: attackerCoord,
    destinationTile,
    metadata,
  });
}
