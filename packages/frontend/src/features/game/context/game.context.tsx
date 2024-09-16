import { GameView, PlayableEntity, PlayerGamePhase, Tile } from "@dnd/shared";
import { PropsWithChildren, useRef } from "react";
import { createContext } from "react";
import { ClientSocket } from "../../../types/socket.type";
import { useGameEngine } from "../game-engine";
import { GameEventManager } from "../game-engine/events";
import { usePlayerState } from "../game-engine/state-machine";
import { useGameActions } from "./use-game-actions";
import { useGetNeighbourTiles } from "./use-get-neighbour-tiles";

type GameContextParams = {
  canvasRef: {
    floor: React.RefObject<HTMLCanvasElement>;
    preview: React.RefObject<HTMLCanvasElement>;
    entities: React.RefObject<HTMLCanvasElement>;
  };
  assetSize: number;
  gameEventManager: GameEventManager;
  game: GameView;
  playerState: ReturnType<typeof usePlayerState>;
  gameActions: ReturnType<typeof useGameActions>;
  phase: PlayerGamePhase;
  neighbourTiles: Tile[] | undefined;
  isPlaying: boolean;
  entityPlaying: PlayableEntity | undefined;
};

export const GameContext = createContext<GameContextParams>({
  game: {},
  phase: "idle",
  gameActions: {},
} as GameContextParams);

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
    gameActions,
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
