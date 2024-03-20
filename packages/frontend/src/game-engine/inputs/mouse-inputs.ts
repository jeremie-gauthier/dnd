import type { RefObject } from "react";
import type { CanvasConfig } from "../utils/coords-conversion.util";
import { handleClick } from "./mouse-events/on-click";

export const useMouseInputs = (
  canvasRef: RefObject<HTMLCanvasElement>,
  canvasConfig: CanvasConfig,
) => {
  const canvas = canvasRef.current;

  const clickHandler = (ev: MouseEvent) => {
    if (!canvas) return;
    handleClick({ ev, canvas, canvasConfig });
  };

  const addClickEvent = () => {
    canvas?.addEventListener("click", clickHandler);
  };

  const clearMouseEvents = () => {
    canvas?.removeEventListener("click", clickHandler);
  };

  return {
    addClickEvent,
    clearMouseEvents,
  };
};
