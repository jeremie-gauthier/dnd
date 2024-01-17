import { withAuthenticationRequired } from '@auth0/auth0-react';
import { ClientLobbyEvent, ServerLobbyEvent } from '@dnd/shared';
import { FileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { LobbiesMenu } from '../../components/lobbies/lobbies-menu/LobbiesMenu';
import { GetLobbiesResponse, useGetLobbies } from '../../hooks/api/lobby/get-lobbies';

export const Route = new FileRoute('/_ws/lobbies').createRoute({
  beforeLoad: async ({ context }) => {
    const { socket } = context;
    await socket.emitWithAck(ClientLobbyEvent.ListenLobbiesChanges);
  },
  component: withAuthenticationRequired(LobbiesRouteComponent),
});

export function LobbiesRouteComponent() {
  const { socket } = Route.useRouteContext();
  const { data: lobbies, isLoading } = useGetLobbies();

  useEffect(() => {
    // TODO: send a toast message instead
    const errorHandler = (payload: { name: string; message: string }) => console.log(payload);

    socket.on(ServerLobbyEvent.Error, errorHandler);

    return () => {
      socket.removeListener(ServerLobbyEvent.Error, errorHandler);
    };
  }, [socket]);

  const isLobbiesDataReady = (lobby?: GetLobbiesResponse): lobby is GetLobbiesResponse => {
    return isLoading === false && lobby !== undefined;
  };

  if (!isLobbiesDataReady(lobbies)) {
    return <div>Lobby data is loading</div>;
  }

  return <LobbiesMenu lobbies={lobbies} socket={socket} />;
}
