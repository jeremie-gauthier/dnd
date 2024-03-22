import {
  translateIsometricTo2DCoord,
  type CanvasConfig,
} from "../../utils/coords-conversion.util";
import { getCursorCoordinates } from "./get-cursor-coordinates";

export type HandleCanvasClickParams = {
  canvas: HTMLCanvasElement;
  ev: MouseEvent;
  canvasConfig: CanvasConfig;
};

export const handleClick = ({
  ev,
  canvas,
  canvasConfig,
}: HandleCanvasClickParams) => {
  const { x, y } = getCursorCoordinates(ev, canvas);
  console.log(`x: ${x} y: ${y}`);

  const translatedCoord = translateIsometricTo2DCoord(
    { row: y, column: x },
    canvasConfig,
  );
  console.log(translatedCoord);

  // TODO: emit event with coords ?
};
