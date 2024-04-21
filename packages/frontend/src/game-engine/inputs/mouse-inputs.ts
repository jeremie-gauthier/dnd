import { GameEntity } from "@dnd/shared";
import type { RefObject } from "react";
import { GameEventManager } from "../events";
import type { CanvasConfig } from "../utils/coords-conversion.util";
import { handleHover } from "./mouse-events/on-hover";
import { handleTileClick } from "./mouse-events/on-tile-click";

export const useMouseInputs = ({
  canvasRef,
  canvasConfig,
  mapMetadata,
  gameEventManager,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  canvasConfig: CanvasConfig;
  mapMetadata: {
    height: GameEntity["map"]["height"];
    width: GameEntity["map"]["width"];
  };
  gameEventManager: GameEventManager;
}) => {
  const canvas = canvasRef.current;

  const tileClickHandler = (ev: MouseEvent) => {
    if (!canvas) return;
    handleTileClick({
      ev,
      canvas,
      canvasConfig,
      mapMetadata,
      gameEventManager,
    });
  };

  const hoverHandler = (ev: MouseEvent) => {
    if (!canvas) return;
    handleHover({ ev, canvas, canvasConfig, gameEventManager });
  };

  const addTileClickEvent = () => {
    canvas?.addEventListener("click", tileClickHandler);
  };

  const addHoverEvent = () => {
    canvas?.addEventListener("mousemove", hoverHandler);
  };

  const clearMouseEvents = () => {
    canvas?.removeEventListener("click", tileClickHandler);
    canvas?.removeEventListener("mousemove", addHoverEvent);
  };

  return {
    addTileClickEvent,
    addHoverEvent,
    clearMouseEvents,
  };
};
