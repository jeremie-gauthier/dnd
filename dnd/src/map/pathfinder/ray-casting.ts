import { PlayableEntityType } from '../../entities/playables/playable.abstract';
import { Coord } from '../coord';
import type { Map } from '../map';
import type { Tile } from '../tile';

function almostEqual(a: number, b: number) {
  return Math.abs(a - b) < 0.000_001;
}

function makeRay(
  map: Map,
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
) {
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

    return Coord.from(toReturn);
  }

  return {
    next: next,
    hasNext: hasNext,
  };
}

function canBeSeenRay(
  map: Map,
  originTile: Tile,
  destinationTile: Tile,
  allies: PlayableEntityType,
) {
  const blockingEntity = destinationTile.getBlockingNonAllyEntity(allies);
  if (blockingEntity) {
    return blockingEntity.isPlayable ? true : false;
  }

  const ray = makeRay(
    map,
    originTile.coord.x + 0.5,
    originTile.coord.y + 0.5,
    destinationTile.coord.x + 0.5,
    destinationTile.coord.y + 0.5,
  );
  while (ray.hasNext()) {
    const nextCoord = ray.next();
    const tile = map.getTileAtCoord(nextCoord);

    if (!tile) {
      return false;
    }

    const blockingEntity = destinationTile.getBlockingNonAllyEntity(allies);
    if (tile !== originTile && blockingEntity) {
      return blockingEntity.isPlayable ? true : false;
    }
  }
  return true;
}

export function lineOfSight(
  map: Map,
  originTile: Tile,
  allies: PlayableEntityType,
) {
  const tilesToTest = map.tiles
    .flat()
    .filter(
      (tile) => tile !== originTile && !tile.isBlockedByNonPlayableEntity(),
    );

  const tilesInSight: Tile[] = [];
  for (const tile of tilesToTest) {
    if (canBeSeenRay(map, originTile, tile, allies)) {
      tilesInSight.push(tile);
    }
  }

  return tilesInSight;
}
