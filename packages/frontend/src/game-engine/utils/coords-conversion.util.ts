import { Coord } from "@dnd/shared";

const w = 64;
const h = 64;
const ratioHW = 0.5;
const CANVAS_WIDTH = 11 * 64;

export const translate2DToIsometricCoord = ({ row, column }: Coord): Coord => {
  const translatedColumn = column * ratioHW * 1 * w + row * ratioHW * -1 * w;
  const translatedRow = column * ratioHW * 0.5 * h + row * ratioHW * 0.5 * h;

  return {
    row: translatedRow,
    column: translatedColumn,
  };
};

export const translateIsometricTo2DCoord = (coord: Coord): Coord => {
  const translatedCoord = {
    row: coord.row,
    // on deduit l'offset en x
    column: coord.column - CANVAS_WIDTH / 2,
  };

  const { row, column } = translatedCoord;

  const a = 0.5 * w;
  const b = -0.5 * w;
  const c = 0.25 * h;
  const d = 0.25 * h;

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
