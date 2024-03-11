import { GameEntity } from "@dnd/shared";
import { useRef } from "react";
import { useGameEngine } from "../../game-engine";
import { Canvas } from "../canvas/canvas";

type Props = {
  game: GameEntity;
};

// TODO: compute height / width dynamically from game.map ?
// 11 tiles * 18 (size of assets) * 4
const HEIGHT = 11 * 64;
const WIDTH = 11 * 64;

export const Game = ({ game }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const gameEngine = useGameEngine(ref, {
    gameData: game,
    height: HEIGHT,
    width: WIDTH,
  });

  return (
    <div className="flex items-center w-full">
      <p>Game ID: {game.id}</p>
      <Canvas ref={ref} height={HEIGHT} width={WIDTH} />
    </div>
  );
};
