import { User, useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { LobbyEntity, ServerLobbyEvent } from "@dnd/shared";
import { FileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Lobby } from "../../components/lobbies/Lobby";
import {
  GET_LOBBY_QUERY_KEY,
  GetLobbyResponse,
  useGetLobby,
} from "../../hooks/api/lobby/get-lobby";

export const Route = new FileRoute("/_ws/lobby/$lobbyId").createRoute({
  component: withAuthenticationRequired(MenuRouteComponent),
});

export function MenuRouteComponent() {
  const { socket, queryClient } = Route.useRouteContext();
  const { lobbyId } = Route.useParams();
  const { user, isLoading } = useAuth0();
  const { data: lobby, isLoading: isLobbyLoading } = useGetLobby(lobbyId);

  useEffect(() => {
    // TODO: send a toast message instead
    const errorHandler = (payload: { name: string; message: string }) =>
      console.log(payload);

    socket.on(ServerLobbyEvent.Error, errorHandler);

    const handleLobbyChanges = ({ lobby }: { lobby: LobbyEntity }) => {
      const heroMap = new Map(
        lobby.heroesAvailable.map((heroAvailable) => [
          heroAvailable.id,
          heroAvailable,
        ]),
      );

      queryClient.setQueryData(
        GET_LOBBY_QUERY_KEY(lobby.id),
        (oldLobby: GetLobbyResponse) => {
          return {
            ...oldLobby,
            players: lobby.players,
            heroesAvailable: oldLobby.heroesAvailable.map((heroAvailable) => {
              return {
                ...heroAvailable,
                pickedBy: heroMap.get(heroAvailable.id)?.pickedBy,
              };
            }),
          };
        },
      );
    };

    socket.on(ServerLobbyEvent.LobbyChangesDetected, handleLobbyChanges);
  }, [socket, queryClient]);

  const isUserDataReady = (user?: User): user is User => {
    return isLoading === false && user !== undefined;
  };

  const isLobbyDataReady = (
    lobby?: GetLobbyResponse,
  ): lobby is GetLobbyResponse => {
    return isLobbyLoading === false && lobby !== undefined;
  };

  if (!isLobbyDataReady(lobby) || !isUserDataReady(user)) {
    return <div>Lobby data is loading</div>;
  }

  return <Lobby user={user} lobby={lobby} socket={socket} />;
}
