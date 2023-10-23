import { Coord } from '../../interfaces/coord.interface';
import { Tile } from '../tile';

export function midpointCircle(tile: Tile, range: number) {
  let x = 0;
  let y = range;
  let m = 5 - 4 * range;

  const coords: Coord[] = [];
  while (x <= y) {
    coords.push(
      { x: x + tile.coord.y, y: y + tile.coord.x },
      { x: y + tile.coord.y, y: x + tile.coord.x },
      { x: -x + tile.coord.y, y: y + tile.coord.x },
      { x: -y + tile.coord.y, y: x + tile.coord.x },
      { x: x + tile.coord.y, y: -y + tile.coord.x },
      { x: y + tile.coord.y, y: -x + tile.coord.x },
      { x: -x + tile.coord.y, y: -y + tile.coord.x },
      { x: -y + tile.coord.y, y: -x + tile.coord.x },
    );
    if (m > 0) {
      y -= 1;
      m = m - 8 * y;
    }
    x += 1;
    m = m + 8 * x + 4;
  }

  return coords;
}
