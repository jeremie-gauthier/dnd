import {
  CurrentPhase,
  useGamePrivateControllerGetUserGameState,
} from "@/openapi/dnd-api";
import { GameView, ServerGameEvent, ServerToClientEvents } from "@dnd/shared";
import { QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ClientSocket } from "../../../types/socket.type";
import { GET_PLAYER_GAME_STATE_QUERY_KEY } from "./get-player-game-state";

export const useGame = ({
  gameId,
  queryClient,
  socket,
}: {
  socket: ClientSocket;
  gameId: GameView["id"];
  queryClient: QueryClient;
}) => {
  const { data: playerGameState, isLoading } =
    useGamePrivateControllerGetUserGameState(gameId);

  const [gameConditionsStatus, setGameConditionsStatus] = useState<
    | Parameters<
        ServerToClientEvents["server.game.ended"]
      >[number]["gameConditionsStatus"]
    | "ongoing"
  >("ongoing");

  useEffect(() => {
    const handleGameChanges: ServerToClientEvents["server.game.changes_detected"] =
      (payload) => {
        queryClient.setQueryData(
          GET_PLAYER_GAME_STATE_QUERY_KEY(gameId),
          () => payload,
        );
      };
    socket.on(ServerGameEvent.GameChangesDetected, handleGameChanges);

    const handleGameEnds: ServerToClientEvents["server.game.ended"] = ({
      gameConditionsStatus,
    }) => setGameConditionsStatus(gameConditionsStatus);
    socket.on(ServerGameEvent.GameEnds, handleGameEnds);

    return () => {
      socket.removeListener(
        ServerGameEvent.GameChangesDetected,
        handleGameChanges,
      );
    };
  }, [socket, queryClient, gameId]);

  return isLoading || playerGameState === undefined
    ? {
        game: undefined,
        isLoading,
        phase: CurrentPhase.idle,
        gameConditionsStatus,
      }
    : {
        game: playerGameState.game,
        isLoading,
        phase: playerGameState.yourStatus,
        gameConditionsStatus,
      };
};
