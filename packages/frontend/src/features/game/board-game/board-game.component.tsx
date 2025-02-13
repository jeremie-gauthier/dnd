import { useGameContext } from "../context/use-game-context";
import { Canvas } from "./canvas.component";
import { TooltipLayer } from "./tooltip-layer/tooltip-layer.component";
import { useCanvasSize } from "./use-canvas-size";

export const BoardGame = () => {
  const { assetSize, canvasRef, game } = useGameContext();
  const { width, height } = useCanvasSize({
    mapWidth: game.board.width,
    mapHeight: game.board.height,
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
      <TooltipLayer
        ref={canvasRef.tooltips}
        height={height}
        width={width}
        className="absolute z-30"
      />
    </div>
  );
};
