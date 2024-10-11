import { GameEventManager } from "../../events";
import {
  type CanvasConfig,
  translateIsometricTo2DCoord,
} from "../../utils/coords-conversion.util";
import { getCursorCoordinates } from "./get-cursor-coordinates";

export type HandleCanvasClickParams = {
  layer: SVGSVGElement;
  ev: MouseEvent;
  layerConfig: CanvasConfig;
  gameEventManager: GameEventManager;
};

export const handleHover = ({
  ev,
  layer,
  layerConfig,
  gameEventManager,
}: HandleCanvasClickParams) => {
  const coord = getCursorCoordinates(ev, layer);
  const isometricCoord = translateIsometricTo2DCoord(
    { row: coord.y, column: coord.x },
    layerConfig,
  );

  gameEventManager.emitTileHovered(coord, isometricCoord);
};
