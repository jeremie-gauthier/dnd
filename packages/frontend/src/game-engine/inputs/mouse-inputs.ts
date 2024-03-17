import type { RefObject } from "react";
import { handleClick } from "./mouse-events/on-click";

export const useMouseInputs = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;

  const addClickEvent = () => {
    if (!canvas) return;
    canvas.addEventListener("click", (ev) => handleClick(ev, canvas));
  };

  const clearMouseEvents = () => {
    if (!canvas) return;
    canvas.removeEventListener("click", (ev) => handleClick(ev, canvas));
  };

  return {
    addClickEvent,
    clearMouseEvents,
  };
};
