import {
  AttackRangeType,
  Coord,
  GameView,
  PlayableEntity,
  Tile,
} from "../../database";
import {
  isBlockedByNonAllyEntity,
  isBlockedByNonPlayableEntity,
} from "./collision";
import { coordToIndex } from "./coord";
import { getNeighbourCoords } from "./get-neighbours-coords";

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
  game,
  originTile,
  destinationTile,
  metadata,
}: {
  ally: PlayableEntity["faction"];
  game: GameView;
  originTile: Tile;
  destinationTile: Tile;
  metadata: { height: number; width: number };
}) {
  if (isBlockedByNonPlayableEntity({ tile: destinationTile })) {
    return false;
  }

  const ray = makeRay(
    originTile.coord.column + 0.5,
    originTile.coord.row + 0.5,
    destinationTile.coord.column + 0.5,
    destinationTile.coord.row + 0.5,
  );
  while (ray.hasNext()) {
    const nextCoord = ray.next();
    const tileIdx = coordToIndex({ coord: nextCoord, metadata });
    const tile = game.map.tiles[tileIdx];

    if (!tile || isBlockedByNonPlayableEntity({ tile })) {
      return false;
    }

    if (isBlockedByNonAllyEntity({ game, tile, ally })) {
      // stop line of sight the first "non-ally" encountered
      return !ray.hasNext();
    }
  }

  return true;
}

function canAttackTile({ tile }: { tile: Tile }) {
  return tile.entities.every(
    (entity) => entity.type !== "non-interactive-entity",
  );
}

function getTilesToTest({
  game,
  originTile,
  range,
  metadata,
}: {
  game: GameView;
  originTile: Tile;
  range: AttackRangeType;
  metadata: { height: number; width: number };
}) {
  const meleeCoords = getNeighbourCoords({ coord: originTile.coord });
  const meleeTiles = meleeCoords
    .map((meleeCoord) => {
      const tileIdx = coordToIndex({ coord: meleeCoord, metadata });
      return game.map.tiles[tileIdx];
    })
    .filter((tile): tile is Tile => tile !== undefined);

  if (range === "melee") {
    return meleeTiles.filter((meleeTile) => canAttackTile({ tile: meleeTile }));
  }

  const tilesToTest = game.map.tiles.filter(
    (tile) => tile !== originTile && canAttackTile({ tile }),
  );

  if (range === "long") {
    return tilesToTest.filter((tileToTest) => !meleeTiles.includes(tileToTest));
  }

  return tilesToTest;
}

export function getLineOfSight({
  ally,
  game,
  originTile,
  range,
}: {
  ally: PlayableEntity["faction"];
  game: GameView;
  originTile: Tile;
  range: AttackRangeType;
}) {
  const metadata = { height: game.map.height, width: game.map.width };
  const tilesToTest = getTilesToTest({ game, originTile, range, metadata });

  const tilesInSight: Tile[] = [];
  for (const tile of tilesToTest) {
    if (
      canBeSeenRay({ ally, game, originTile, destinationTile: tile, metadata })
    ) {
      tilesInSight.push(tile);
    }
  }

  return tilesInSight;
}

export function canAttackTarget({
  ally,
  game,
  originTile,
  range,
  targetCoord,
}: {
  ally: PlayableEntity["faction"];
  game: GameView;
  originTile: Tile;
  range: AttackRangeType;
  targetCoord: Coord;
}): boolean {
  if (
    range === "melee" &&
    getNeighbourCoords({ coord: originTile.coord }).every(
      (coord) =>
        coord.row !== targetCoord.row && coord.column !== targetCoord.column,
    )
  ) {
    return false;
  }

  if (
    range === "long" &&
    getNeighbourCoords({ coord: originTile.coord }).some(
      (coord) =>
        coord.row === targetCoord.row && coord.column === targetCoord.column,
    )
  ) {
    return false;
  }

  const metadata = { height: game.map.height, width: game.map.width };

  const destinationTileIdx = coordToIndex({ coord: targetCoord, metadata });
  const destinationTile = game.map.tiles[destinationTileIdx];
  if (!destinationTile) {
    return false;
  }

  return canBeSeenRay({ ally, game, originTile, destinationTile, metadata });
}
