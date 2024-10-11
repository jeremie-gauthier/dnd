import { GameView } from "@dnd/shared";
import type { RefObject } from "react";
import { GameEventManager } from "../events";
import type { CanvasConfig } from "../utils/coords-conversion.util";
import { handleHover } from "./mouse-events/on-hover";
import { handleTileClick } from "./mouse-events/on-tile-click";
import { handleTilePressed } from "./mouse-events/on-tile-pressed";
import { handleTileReleased } from "./mouse-events/on-tile-released";

export const useMouseInputs = ({
  layerRef,
  canvasConfig,
  mapMetadata,
  gameEventManager,
}: {
  layerRef: RefObject<SVGSVGElement>;
  canvasConfig: CanvasConfig;
  mapMetadata: {
    height: GameView["map"]["height"];
    width: GameView["map"]["width"];
  };
  gameEventManager: GameEventManager;
}) => {
  const layer = layerRef.current;

  const tileClickHandler = (ev: MouseEvent) => {
    if (!layer) return;
    handleTileClick({
      ev,
      layer,
      layerConfig: canvasConfig,
      mapMetadata,
      gameEventManager,
    });
  };

  const tileReleasedHandler = (ev: MouseEvent) => {
    if (!layer) return;
    handleTileReleased({
      ev,
      layer,
      layerConfig: canvasConfig,
      gameEventManager,
    });
  };

  const tilePressedHandler = (ev: MouseEvent) => {
    if (!layer) return;
    handleTilePressed({
      ev,
      layer,
      layerConfig: canvasConfig,
      mapMetadata,
      gameEventManager,
    });
  };

  const hoverHandler = (ev: MouseEvent) => {
    if (!layer) return;
    handleHover({ ev, layer, layerConfig: canvasConfig, gameEventManager });
  };

  const addTileClickEvent = () => {
    layer?.addEventListener("click", tileClickHandler);
  };

  const addTilePressedEvent = () => {
    layer?.addEventListener("mousedown", tilePressedHandler);
  };

  const addTileReleasedEvent = () => {
    layer?.addEventListener("mouseup", tileReleasedHandler);
  };

  const addHoverEvent = () => {
    layer?.addEventListener("mousemove", hoverHandler);
  };

  const clearMouseEvents = () => {
    layer?.removeEventListener("click", tileClickHandler);
    layer?.removeEventListener("mousedown", tilePressedHandler);
    layer?.removeEventListener("mouseup", tileReleasedHandler);
    layer?.removeEventListener("mousemove", addHoverEvent);
  };

  return {
    addTileClickEvent,
    addTilePressedEvent,
    addTileReleasedEvent,
    addHoverEvent,
    clearMouseEvents,
  };
};
