import { Coord } from "@dnd/shared";

const w = 64;
const h = 64;
const ratioHW = 0.5;

export const translate2DToIsometricCoord = ({ row, column }: Coord): Coord => {
  const translatedColumn = column * ratioHW * 1 * w + row * ratioHW * -1 * w;
  const translatedRow = column * ratioHW * 0.5 * h + row * ratioHW * 0.5 * h;

  return {
    row: translatedRow,
    column: translatedColumn,
  };
};
