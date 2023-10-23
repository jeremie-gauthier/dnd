import type { Coord } from '../../interfaces/coord.interface';
import type { Map } from '../map';
import type { Tile } from '../tile';
import { findPath } from './breadth-first-search';

// ! cette methode n'est peut etre pas parfaite
// ! mauvaise intuition...
function isInSight(originTile: Tile, targetTile: Tile) {
  if (targetTile.content.type === 'blocked') {
    return false;
  }

  const maxRange =
    Math.abs(originTile.coord.x - targetTile.coord.x) +
    Math.abs(originTile.coord.y - targetTile.coord.y);

  const path = findPath(originTile, targetTile, maxRange);
  return path;
}

// !! C'EST UN ALGO DE RAYCASTING QU'IL ME FAUT !!!
// ! + il faudra parcourir le graphe pour prendre en compte les collisions
export function bresenhamLine(map: Map, originTile: Tile, targetTile: Tile) {
  const dy = targetTile.coord.y - originTile.coord.y;
  const dx = targetTile.coord.x - originTile.coord.x;
  let y = originTile.coord.y;
  let error = 0;
  const error10 = dy / dx;
  const error01 = -1;

  const coords: Coord[] = [];
  for (let x = originTile.coord.x; x <= targetTile.coord.x; x++) {
    const tile = map.tiles[y]?.[x];
    if (!tile || !isInSight(originTile, tile)) {
      return coords;
    }

    coords.push({ x, y });
    error += error10;
    if (error >= 0.5) {
      y += 1;
      error += error01;
    }
  }

  // ? I've added this part to always include the targetted coord
  const tile = map.tiles[y]?.[targetTile.coord.x];
  if (!tile || !isInSight(originTile, tile)) {
    return coords;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const lastCoord = coords.at(-1)!;
  const diffX = lastCoord.x - targetTile.coord.x;
  const diffY = lastCoord.y - targetTile.coord.y;
  if (diffX !== 0 || diffY !== 0) {
    coords.push(targetTile.coord);
  }

  return coords;
}
