import { GameView, PlayerGamePhase } from "@dnd/shared";
import { PropsWithChildren, useRef } from "react";
import { ClientSocket } from "../../../types/socket.type";
import { useGameEngine } from "../game-engine";
import { GameContext } from "./game.context";
import { useGameActions } from "./use-game-actions";
import { useGameLogs } from "./use-game-logs";
import { useGetNeighbourTiles } from "./use-get-neighbour-tiles";

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
  const { actionsLogs } = useGameLogs({ socket });
  const gameActions = useGameActions({ socket });
  const floorCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const entitiesCanvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipsCanvasRef = useRef<HTMLCanvasElement>(null);

  const { assetSize, gameEventManager, playerState } = useGameEngine({
    floorCanvasRef,
    previewCanvasRef,
    entitiesCanvasRef,
    gameActions,
    gameEntity: game,
    gamePhase: phase,
    tooltipsCanvasRef,
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
        actionsLogs,
        canvasRef: {
          floor: floorCanvasRef,
          preview: previewCanvasRef,
          entities: entitiesCanvasRef,
          tooltips: tooltipsCanvasRef,
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
