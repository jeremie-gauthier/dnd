import {
  GetLobbiesOutputDto,
  useLobbyPrivateControllerGetLobbies,
} from "@/openapi/dnd-api";
import { ClientLobbyEvent, ServerLobbyEvent } from "@dnd/shared";
import { LobbyList } from "@features/lobbies/lobby-list/lobby-list.component";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_ws/lobbies")({
  beforeLoad: async ({ context }) => {
    const { socket } = context;
    await socket.emitWithAck(ClientLobbyEvent.ListenLobbiesChanges);
  },
  component: LobbiesRouteComponent,
});

export function LobbiesRouteComponent() {
  const { socket } = Route.useRouteContext();
  const {
    data: lobbies,
    isLoading,
    refetch,
  } = useLobbyPrivateControllerGetLobbies();

  useEffect(() => {
    // TODO: send a toast message instead
    const errorHandler = (payload: { name: string; message: string }) =>
      console.log(payload);
    socket.on(ServerLobbyEvent.Error, errorHandler);

    socket.on(ServerLobbyEvent.LobbiesChangesDetected, () => refetch());
    socket.on(ServerLobbyEvent.LobbiesDeleted, () => refetch());

    return () => {
      socket.removeAllListeners();
    };
  }, [socket, refetch]);

  const isLobbiesDataReady = (
    lobby?: GetLobbiesOutputDto,
  ): lobby is GetLobbiesOutputDto => {
    return isLoading === false && lobby !== undefined;
  };

  if (!isLobbiesDataReady(lobbies)) {
    return <div>Lobby data is loading</div>;
  }

  return <LobbyList lobbies={lobbies} socket={socket} />;
}
