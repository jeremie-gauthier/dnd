import { GameResponseDto, PlayerStatus } from "@/openapi/dnd-api";
import { PropsWithChildren, useRef } from "react";
import { ClientSocket } from "../../../types/socket.type";
import { useGameEngine } from "../game-engine";
import { GameContext } from "./game.context";
import { useGameActions } from "./use-game-actions";
import { useGameLogs } from "./use-game-logs";
import { useGetNeighbourTiles } from "./use-get-neighbour-tiles";

type Props = PropsWithChildren<{
  game: GameResponseDto;
  phase: PlayerStatus;
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
  const tooltipsLayerRef = useRef<SVGSVGElement>(null);

  const { assetSize, gameEventManager, playerState } = useGameEngine({
    floorCanvasRef,
    previewCanvasRef,
    entitiesCanvasRef,
    gameActions,
    gameEntity: game,
    gamePhase: phase,
    tooltipsLayerRef,
  });

  const isPlaying = phase === PlayerStatus.action;
  const entityPlaying = Object.values(game.playableEntities).find(
    ({ currentPhase }) => currentPhase === PlayerStatus.action,
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
          tooltips: tooltipsLayerRef,
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
