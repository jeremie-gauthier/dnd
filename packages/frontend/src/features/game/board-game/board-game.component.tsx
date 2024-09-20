import { useGameContext } from "../context/game.context";
import { Canvas } from "./canvas.component";
import { useCanvasSize } from "./use-canvas-size";

export const BoardGameCanvas = () => {
  const { assetSize, canvasRef, game } = useGameContext();
  const { width, height } = useCanvasSize({
    mapWidth: game.map.width,
    mapHeight: game.map.height,
    assetSize,
  });

  return (
    <div className="relative" style={{ height, width }}>
      <Canvas
        ref={canvasRef.floor}
        height={height}
        width={width}
        className="absolute z-0"
      />
      <Canvas
        ref={canvasRef.preview}
        height={height}
        width={width}
        className="absolute z-10"
      />
      <Canvas
        ref={canvasRef.entities}
        height={height}
        width={width}
        className="absolute z-20"
      />
      <Canvas
        ref={canvasRef.tooltips}
        height={height}
        width={width}
        className="absolute z-30"
      />
    </div>
  );
};
