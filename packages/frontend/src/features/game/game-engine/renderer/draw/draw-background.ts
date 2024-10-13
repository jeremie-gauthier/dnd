type Params = {
  context: CanvasRenderingContext2D;
  canvasHeight: number;
  canvasWidth: number;
};

export function drawBackground({ context, canvasHeight, canvasWidth }: Params) {
  context.fillStyle = "#202020";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
}
