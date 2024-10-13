export function getCursorCoordinates(
  ev: MouseEvent,
  layer: SVGSVGElement,
): { x: number; y: number } {
  const rect = layer.getBoundingClientRect();
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;

  return { x, y };
}
