import { getCursorCoordinates } from "./get-cursor-coordinates";

export const handleClick = (ev: MouseEvent, canvas: HTMLCanvasElement) => {
  const { x, y } = getCursorCoordinates(ev, canvas);
  console.log(`x: ${x} y: ${y}`);
  // TODO: emit event with coords ?
};
