import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FileRoute } from '@tanstack/react-router';
import { Lobby } from '../../components/lobbies/Lobby';
import { GetLobbyResponse, useGetLobby } from '../../hooks/api/lobby/get-lobby';

export const Route = new FileRoute('/_ws/lobby/$lobbyId').createRoute({
  component: withAuthenticationRequired(MenuRouteComponent),
});

export function MenuRouteComponent() {
  const { lobbyId } = Route.useParams();
  const { data: lobby, isLoading: isLobbyLoading } = useGetLobby(lobbyId);

  const isLobbyDataReady = (lobby?: GetLobbyResponse): lobby is GetLobbyResponse => {
    return isLobbyLoading === false && lobby !== undefined;
  };

  if (!isLobbyDataReady(lobby)) {
    return <div>Lobby data is loading</div>;
  }

  return <Lobby lobby={lobby} />;
}
