import { ClientSocket } from "@/types/socket.type";
import { GameLog, ServerGameEvent } from "@dnd/shared";
import { useEffect, useState } from "react";

type Params = {
  socket: ClientSocket;
};

export const useGameLogs = ({ socket }: Params) => {
  const [actionsLogs, setActionsLogs] = useState<GameLog[]>([]);

  useEffect(() => {
    const handleGameLog = (gameLog: GameLog) => {
      setActionsLogs((previousData) => [
        { ...gameLog, createdAt: new Date(gameLog.createdAt) },
        ...previousData.slice(0, 49),
      ]);
    };

    socket.on(ServerGameEvent.GameLogCreated, handleGameLog);

    return () => {
      socket.removeListener(ServerGameEvent.GameLogCreated, handleGameLog);
    };
  }, [socket]);

  return { actionsLogs };
};
