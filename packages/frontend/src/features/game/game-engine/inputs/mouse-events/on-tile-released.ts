import { GameEventManager } from "../../events";
import {
  type CanvasConfig,
  translateIsometricTo2DCoord,
} from "../../utils/coords-conversion.util";
import { getCursorCoordinates } from "./get-cursor-coordinates";

export type HandleTileReleasedParams = {
  canvas: HTMLCanvasElement;
  ev: MouseEvent;
  canvasConfig: CanvasConfig;
  gameEventManager: GameEventManager;
};

export const handleTileReleased = ({
  ev,
  canvas,
  canvasConfig,
  gameEventManager,
}: HandleTileReleasedParams) => {
  const coord = getCursorCoordinates(ev, canvas);
  const isometricCoord = translateIsometricTo2DCoord(
    { row: coord.y, column: coord.x },
    canvasConfig,
  );

  gameEventManager.emitTileReleased(coord, isometricCoord);
};
