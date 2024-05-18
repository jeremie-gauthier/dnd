import { Coord, GameEntity, Tile } from "../../database";
import { canMoveToRequestedPosition } from "./collision";
import { coordToIndex } from "./coord";

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

function isBlockedByEnemyEntity({
  game,
  tile,
}: { game: GameEntity; tile: Tile }) {
  return tile.entities.some(
    (entity) =>
      entity.type === "playable-entity" &&
      game.playableEntities[entity.id]?.type === "enemy" &&
      game.playableEntities[entity.id]?.isBlocking,
  );
}

// entity enemie, jouable et blocking
function canBeSeenRay({
  game,
  originTile,
  destinationTile,
}: { game: GameEntity; originTile: Tile; destinationTile: Tile }) {
  if (isBlockedByEnemyEntity({ game, tile: destinationTile })) {
    return true;
  }

  const metadata = { height: game.map.height, width: game.map.width };

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

    if (!tile) {
      return false;
    }

    if (
      tile !== originTile &&
      isBlockedByEnemyEntity({ game, tile: destinationTile })
    ) {
      return true;
    }
  }

  return true;
}

// ! si y'a un pb dans l'algo c'est que x et y sont mal mappés sur row et column
// ! => il faudra inverser row et column pour fix
export function lineOfSight({
  game,
  originTile,
}: { game: GameEntity; originTile: Tile }) {
  const tilesToTest = game.map.tiles.filter(
    (tile) => tile !== originTile && canMoveToRequestedPosition({ tile }),
  );

  const tilesInSight: Tile[] = [];
  for (const tile of tilesToTest) {
    if (canBeSeenRay({ game, originTile, destinationTile: tile })) {
      tilesInSight.push(tile);
    }
  }

  return tilesInSight;
}
