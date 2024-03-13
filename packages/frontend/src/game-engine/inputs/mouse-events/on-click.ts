import { translateIsometricTo2DCoord } from "../../utils/coords-conversion.util";
import { getCursorCoordinates } from "./get-cursor-coordinates";

export const handleClick = (ev: MouseEvent, canvas: HTMLCanvasElement) => {
  const { x, y } = getCursorCoordinates(ev, canvas);
  console.log(`x: ${x} y: ${y}`);

  const translatedCoord = translateIsometricTo2DCoord({ row: y, column: x });
  console.log(translatedCoord);

  // TODO: emit event with coords ?
};
