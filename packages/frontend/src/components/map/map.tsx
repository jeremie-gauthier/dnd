import { GameEntity } from "@dnd/shared";
import { useEffect, useRef } from "react";
import { Canvas } from "../canvas/canvas";

type Props = {
  map: GameEntity["map"];
};

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

export const GameView = ({ map }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const tileDimension = {
  //   width: CANVAS_WIDTH / map.width,
  //   height: CANVAS_HEIGHT / map.height,
  // };

  const handleCanvasClick = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    console.log(evt);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Array.from({ length: map.width * map.height }).map
    // const tiles = [];
    for (let x = 0; x < map.width; x++) {
      for (let y = 0; y < map.height; y++) {
        // create tile
        // add entities on tile
      }
    }
  }, [map]);

  return (
    <Canvas
      ref={canvasRef}
      height={CANVAS_HEIGHT}
      width={CANVAS_WIDTH}
      onClick={handleCanvasClick}
    />
  );
};
