import { GameView } from "@dnd/shared";
import type { RefObject } from "react";
import { GameEventManager } from "../events";
import type { CanvasConfig } from "../utils/coords-conversion.util";
import { handleHover } from "./mouse-events/on-hover";
import { handleTileClick } from "./mouse-events/on-tile-click";
import { handleTileReleased } from "./mouse-events/on-tile-released";
import { handleTilePressed } from "./mouse-events/on-tile-pressed";

export const useMouseInputs = ({
  canvasRef,
  canvasConfig,
  mapMetadata,
  gameEventManager,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  canvasConfig: CanvasConfig;
  mapMetadata: {
    height: GameView["map"]["height"];
    width: GameView["map"]["width"];
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

  const tileReleasedHandler = (ev: MouseEvent) => {
    if (!canvas) return;
    handleTileReleased({
      ev,
      canvas,
      canvasConfig,
      gameEventManager,
    });
  };

  const tilePressedHandler = (ev: MouseEvent) => {
    if (!canvas) return;
    handleTilePressed({
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

  const addTilePressedEvent = () => {
    canvas?.addEventListener("mousedown", tilePressedHandler);
  };

  const addTileReleasedEvent = () => {
    canvas?.addEventListener("mouseup", tileReleasedHandler);
  };

  const addHoverEvent = () => {
    canvas?.addEventListener("mousemove", hoverHandler);
  };

  const clearMouseEvents = () => {
    canvas?.removeEventListener("click", tileClickHandler);
    canvas?.removeEventListener("mousedown", tilePressedHandler);
    canvas?.removeEventListener("mouseup", tileReleasedHandler);
    canvas?.removeEventListener("mousemove", addHoverEvent);
  };

  return {
    addTileClickEvent,
    addTilePressedEvent,
    addTileReleasedEvent,
    addHoverEvent,
    clearMouseEvents,
  };
};
