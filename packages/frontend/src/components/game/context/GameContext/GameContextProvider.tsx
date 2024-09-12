import { GameView, PlayerGamePhase } from "@dnd/shared";
import { PropsWithChildren, useRef } from "react";
import { useGameEngine } from "../../../../game-engine";
import { useGetNeighbourTiles } from "../../../../hooks/api/game/get-neighbour-tiles";
import { useGameActions } from "../../../../hooks/api/game/use-game-actions";
import { ClientSocket } from "../../../../types/socket.type";
import { GameContext } from "./GameContext";

type Props = PropsWithChildren<{
  game: GameView;
  phase: PlayerGamePhase;
  socket: ClientSocket;
}>;

export const GameContextProvider = ({
  game,
  phase,
  socket,
  children,
}: Props) => {
  const gameActions = useGameActions({ socket });
  const floorCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const entitiesCanvasRef = useRef<HTMLCanvasElement>(null);

  const { assetSize, gameEventManager, playerState } = useGameEngine({
    floorCanvasRef,
    previewCanvasRef,
    entitiesCanvasRef,
    gameEntity: game,
    gamePhase: phase,
  });

  const isPlaying = phase === "action";
  const entityPlaying = Object.values(game.playableEntities).find(
    ({ currentPhase }) => currentPhase === "action",
  );

  const neighbourTiles = useGetNeighbourTiles({
    isPlaying,
    entityPlaying,
    game,
  });

  return (
    <GameContext.Provider
      value={{
        canvasRef: {
          floor: floorCanvasRef,
          preview: previewCanvasRef,
          entities: entitiesCanvasRef,
        },
        game,
        phase,
        assetSize,
        gameEventManager,
        playerState,
        gameActions,
        neighbourTiles,
        isPlaying,
        entityPlaying,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
