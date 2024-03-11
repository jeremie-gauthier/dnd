// ? this fn can be used to flip assets so that I can reuse them for both isometric orientations
export const flipVertically = (context: CanvasRenderingContext2D): void => {
  context.scale(-1, 1);
};
