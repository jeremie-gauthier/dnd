import { Coord } from '../interfaces/coord.interface';

export const isNextTo = (coordA: Coord, coordB: Coord) => {
  const diffX = Math.abs(coordA.x - coordB.x);
  const diffY = Math.abs(coordA.y - coordB.y);
  const diff = diffX + diffY;
  return diff === 1;
};
