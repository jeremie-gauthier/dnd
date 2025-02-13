import { Board } from "@/openapi/dnd-api";
import { isInRange } from "@dnd/shared";
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
  mapMetadata: {
    height: Board["height"];
    width: Board["width"];
  };
  gameEventManager: GameEventManager;
};

export const handleTileClick = ({
  ev,
  layer,
  layerConfig,
  mapMetadata,
  gameEventManager,
}: Params) => {
  const coord = getCursorCoordinates(ev, layer);
  const coord2D = translateIsometricTo2DCoord(
    { row: coord.y, column: coord.x },
    layerConfig,
  );

  if (
    isInRange(coord2D.row, 0, mapMetadata.height - 1) &&
    isInRange(coord2D.column, 0, mapMetadata.width - 1)
  ) {
    gameEventManager.emitTileClicked(coord, coord2D);
  }
};
