import {
  ClientGameEvent,
  ClientToServerEvents,
  GameEntity,
  PlayerGamePhase,
  ServerGameEvent,
  ServerToClientEvents,
} from "@dnd/shared";
import { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ClientSocket } from "../../../types/socket.type";
import {
  GET_PLAYER_GAME_STATE_QUERY_KEY,
  useGetPlayerGameState,
} from "./get-player-game-state";

export const useGame = ({
  gameId,
  queryClient,
  socket,
}: {
  socket: ClientSocket;
  gameId: GameEntity["id"];
  queryClient: QueryClient;
}) => {
  const { data: playerGameState, isLoading } = useGetPlayerGameState(gameId);

  useEffect(() => {
    const handleGameChanges: ServerToClientEvents["server.game.changes_detected"] =
      (payload) => {
        console.log("game changes:", payload);

        queryClient.setQueryData(
          GET_PLAYER_GAME_STATE_QUERY_KEY(gameId),
          () => payload,
        );
      };

    socket.on(ServerGameEvent.GameChangesDetected, handleGameChanges);

    return () => {
      socket.removeListener(
        ServerGameEvent.GameChangesDetected,
        handleGameChanges,
      );
    };
  }, [socket, queryClient, gameId]);

  const moveHandler: ClientToServerEvents["client.game.player_requests_playable_entity_moves"] =
    (payload) => {
      socket.emit(ClientGameEvent.PlayableEntityMoves, payload);
    };

  const endTurnHandler: ClientToServerEvents["client.game.player_requests_playable_entity_turn_ends"] =
    () => {
      socket.emit(ClientGameEvent.PlayableEntityTurnEnds);
    };

  return isLoading || playerGameState === undefined
    ? { game: undefined, isLoading, phase: "idle" as PlayerGamePhase }
    : {
        game: playerGameState.game,
        isLoading,
        phase: playerGameState.playerPhase,
        actionHandlers: {
          move: moveHandler,
          endTurn: endTurnHandler,
        },
      };
};
