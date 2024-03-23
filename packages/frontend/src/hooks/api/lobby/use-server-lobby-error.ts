import { ServerLobbyEvent } from "@dnd/shared";
import { useEffect } from "react";
import type { ClientSocket } from "../../../types/socket.type";

export const useServerLobbyError = (socket: ClientSocket) => {
  useEffect(() => {
    const errorHandler = (payload: { name: string; message: string }) => {
      // TODO: send a toast message instead
      console.log(payload);
    };
    socket.on(ServerLobbyEvent.Error, errorHandler);

    return () => {
      socket.removeListener(ServerLobbyEvent.Error, errorHandler);
    };
  }, [socket]);
};
