import {
  type User,
  useAuth0,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import { GameView, type LobbyView, ServerLobbyEvent } from "@dnd/shared";
import { LobbyForm } from "@features/lobby";
import {
  GET_LOBBY_QUERY_KEY,
  type GetLobbyResponse,
  useGetLobby,
} from "@features/lobby";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useServerLobbyError } from "../hooks/api/lobby/use-server-lobby-error";

export const Route = createFileRoute("/_ws/lobby/$lobbyId")({
  component: withAuthenticationRequired(MenuRouteComponent),
});

export function MenuRouteComponent() {
  const { socket, queryClient } = Route.useRouteContext();
  const { lobbyId } = Route.useParams();
  const { user, isLoading } = useAuth0();
  const { data: lobby, isLoading: isLobbyLoading } = useGetLobby(lobbyId);
  useServerLobbyError(socket);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: useGameInitializationDone hook ?
    const gameInitializationDoneHandler = async ({
      game,
    }: { game: GameView }) => {
      navigate({
        to: "/game/$gameId",
        params: { gameId: game.id },
      });
    };
    socket.on(
      ServerLobbyEvent.GameInitializationDone,
      gameInitializationDoneHandler,
    );

    // TODO: useLobbyChangesHandler hook ?
    const handleLobbyChanges = ({ lobby }: { lobby: LobbyView }) => {
      queryClient.setQueryData(GET_LOBBY_QUERY_KEY(lobby.id), () => lobby);
    };
    socket.on(ServerLobbyEvent.LobbyChangesDetected, handleLobbyChanges);

    const handleUserLeftLobby = () => {
      navigate({ to: "/lobbies" });
    };
    socket.on(ServerLobbyEvent.UserLeftLobby, handleUserLeftLobby);

    return () => {
      socket.removeAllListeners();
    };
  }, [socket, queryClient, navigate]);

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

  return <LobbyForm user={user} lobby={lobby} socket={socket} />;
}
