import { GameView, isInRange } from "@dnd/shared";
import { GameEventManager } from "../../events";
import {
  type CanvasConfig,
  translateIsometricTo2DCoord,
} from "../../utils/coords-conversion.util";
import { getCursorCoordinates } from "./get-cursor-coordinates";

export type HandleTilePressedParams = {
  layer: SVGSVGElement;
  ev: MouseEvent;
  layerConfig: CanvasConfig;
  mapMetadata: {
    height: GameView["map"]["height"];
    width: GameView["map"]["width"];
  };
  gameEventManager: GameEventManager;
};

export const handleTilePressed = ({
  ev,
  layer,
  layerConfig,
  mapMetadata,
  gameEventManager,
}: HandleTilePressedParams) => {
  const coord = getCursorCoordinates(ev, layer);
  const isometricCoord = translateIsometricTo2DCoord(
    { row: coord.y, column: coord.x },
    layerConfig,
  );

  if (
    isInRange(isometricCoord.row, 0, mapMetadata.height - 1) &&
    isInRange(isometricCoord.column, 0, mapMetadata.width - 1)
  ) {
    gameEventManager.emitTilePressed(coord, isometricCoord);
  }
};
