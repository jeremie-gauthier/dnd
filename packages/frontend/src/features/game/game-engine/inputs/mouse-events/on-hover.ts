import { GameEventManager } from "../../events";
import {
  type CanvasConfig,
  translateIsometricTo2DCoord,
} from "../../utils/coords-conversion.util";
import { getCursorCoordinates } from "./get-cursor-coordinates";

type Params = {
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
}: Params) => {
  const coord = getCursorCoordinates(ev, layer);
  const coord2D = translateIsometricTo2DCoord(
    { row: coord.y, column: coord.x },
    layerConfig,
  );

  gameEventManager.emitTileHovered(coord, coord2D);
};
