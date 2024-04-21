import { GameEntity, isInRange } from "@dnd/shared";
import { GameEventManager } from "../../events";
import {
  translateIsometricTo2DCoord,
  type CanvasConfig,
} from "../../utils/coords-conversion.util";
import { getCursorCoordinates } from "./get-cursor-coordinates";

export type HandleTileClickParams = {
  canvas: HTMLCanvasElement;
  ev: MouseEvent;
  canvasConfig: CanvasConfig;
  mapMetadata: {
    height: GameEntity["map"]["height"];
    width: GameEntity["map"]["width"];
  };
  gameEventManager: GameEventManager;
};

export const handleTileClick = ({
  ev,
  canvas,
  canvasConfig,
  mapMetadata,
  gameEventManager,
}: HandleTileClickParams) => {
  const coord = getCursorCoordinates(ev, canvas);
  const isometricCoord = translateIsometricTo2DCoord(
    { row: coord.y, column: coord.x },
    canvasConfig,
  );

  if (
    isInRange(isometricCoord.row, 0, mapMetadata.height - 1) &&
    isInRange(isometricCoord.column, 0, mapMetadata.width - 1)
  ) {
    gameEventManager.emitTileClicked(coord, isometricCoord);
  }
};
