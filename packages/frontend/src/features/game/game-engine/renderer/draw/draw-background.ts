type Params = {
  context: CanvasRenderingContext2D;
  canvasHeight: number;
  canvasWidth: number;
};

export function drawBackground({ context, canvasHeight, canvasWidth }: Params) {
  context.fillStyle = "#262626";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
}
