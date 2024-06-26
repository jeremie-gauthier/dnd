import { GameLog, ServerGameEvent } from "@dnd/shared";
import { useEffect, useState } from "react";
import { ClientSocket } from "../../../types/socket.type";
import { ActionLog } from "./ActionLog";

type Props = {
  socket: ClientSocket;
};

export const ActionsLog = ({ socket }: Props) => {
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

  return (
    <ul className="flex flex-col-reverse h-32 w-96 overflow-y-scroll border rounded-sm px-1">
      {actionsLogs.map((actionLog, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <ActionLog key={idx} {...actionLog} />
      ))}
    </ul>
  );
};
