import { GameEventManager } from "../../events";
import {
  type CanvasConfig,
  translateIsometricTo2DCoord,
} from "../../utils/coords-conversion.util";
import { getCursorCoordinates } from "./get-cursor-coordinates";

export type HandleCanvasClickParams = {
  canvas: HTMLCanvasElement;
  ev: MouseEvent;
  canvasConfig: CanvasConfig;
  gameEventManager: GameEventManager;
};

export const handleHover = ({
  ev,
  canvas,
  canvasConfig,
  gameEventManager,
}: HandleCanvasClickParams) => {
  const coord = getCursorCoordinates(ev, canvas);
  const isometricCoord = translateIsometricTo2DCoord(
    { row: coord.y, column: coord.x },
    canvasConfig,
  );

  gameEventManager.emitTileHovered(coord, isometricCoord);
};
