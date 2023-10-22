import { Coord } from '../interfaces/coord.interface';

export function equals(coordA: Coord, coordB: Coord) {
  return coordA.x === coordB.x && coordA.y === coordB.y;
}
