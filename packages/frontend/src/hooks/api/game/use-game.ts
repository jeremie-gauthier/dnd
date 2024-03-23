import {
  PlayerGamePhase,
  ServerGameEvent,
  ServerToClientEvents,
  type GameEntity,
} from "@dnd/shared";
import { useEffect, useState } from "react";
import { ClientSocket } from "../../../types/socket.type";
import { useIsLoading } from "../../useIsLoading";

export const useGame = (socket: ClientSocket) => {
  const [game, setGame] = useState<GameEntity>();
  const [phase, setPhase] = useState<PlayerGamePhase>("idle");

  useEffect(() => {
    const handleGameChanges: ServerToClientEvents["server.game.changes_detected"] =
      ({ game, phase }) => {
        setGame(game);
        setPhase(phase);
      };

    socket.on(ServerGameEvent.GameChangesDetected, handleGameChanges);

    return () => {
      socket.removeListener(
        ServerGameEvent.GameChangesDetected,
        handleGameChanges,
      );
    };
  }, [socket]);

  const { state, isLoading } = useIsLoading(game);

  return isLoading
    ? { game: state, isLoading, phase }
    : { game: state, isLoading, phase };
};
