import type { Coord } from "@dnd/shared";

export type CanvasConfig = {
  assetSize: number;
  map: {
    height: number;
    width: number;
  };
};

export const translate2DToIsometricCoord = (
  { row, column }: Coord,
  config: CanvasConfig,
): Coord => {
  const translatedColumn =
    column * 0.5 * config.assetSize + row * -0.5 * config.assetSize;
  const translatedRow =
    column * 0.25 * config.assetSize + row * 0.25 * config.assetSize;

  return {
    row: translatedRow,
    column: translatedColumn,
  };
};

export const translateIsometricTo2DCoord = (
  coord: Coord,
  config: CanvasConfig,
): Coord => {
  const size = Math.max(config.map.width, config.map.height);

  const translatedCoord = {
    row: coord.row,
    // on deduit l'offset en x
    column: coord.column - size / 2,
  };

  const { row, column } = translatedCoord;

  const a = 0.5 * config.assetSize;
  const b = -0.5 * config.assetSize;
  const c = 0.25 * config.assetSize;
  const d = 0.25 * config.assetSize;

  const determinant = 1 / (a * d - b * c);
  const invertedMatrix = {
    a: determinant * d,
    b: determinant * -b,
    c: determinant * -c,
    d: determinant * a,
  };

  return {
    column: Math.trunc(column * invertedMatrix.a + row * invertedMatrix.b),
    row: Math.trunc(column * invertedMatrix.c + row * invertedMatrix.d),
  };
};
