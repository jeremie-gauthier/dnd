import { GameView, isInRange } from "@dnd/shared";
import { GameEventManager } from "../../events";
import {
  type CanvasConfig,
  translateIsometricTo2DCoord,
} from "../../utils/coords-conversion.util";
import { getCursorCoordinates } from "./get-cursor-coordinates";

export type HandleTileClickParams = {
  layer: SVGSVGElement;
  ev: MouseEvent;
  layerConfig: CanvasConfig;
  mapMetadata: {
    height: GameView["map"]["height"];
    width: GameView["map"]["width"];
  };
  gameEventManager: GameEventManager;
};

export const handleTileClick = ({
  ev,
  layer,
  layerConfig,
  mapMetadata,
  gameEventManager,
}: HandleTileClickParams) => {
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
