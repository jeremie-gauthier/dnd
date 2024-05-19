import { Canvas } from "../canvas/canvas";
import { useGameContext } from "./context/GameContext/useGameContext";
import { useCanvasSize } from "./useCanvasSize";

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
    </div>
  );
};
