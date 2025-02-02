import {
  GetLobbyOutputDto,
  useLobbyPrivateControllerGetLobby,
} from "@/openapi/dnd-api";
import { type User, useAuth0 } from "@auth0/auth0-react";
import { type GameView, ServerLobbyEvent } from "@dnd/shared";
import { LobbyForm } from "@features/lobbies/lobby-form/lobby-form.component";
import { useServerLobbyError } from "@features/lobbies/use-server-lobby-error";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/_ws/lobby/$lobbyId")({
  component: MenuRouteComponent,
});

export function MenuRouteComponent() {
  const { socket } = Route.useRouteContext();
  const { lobbyId } = Route.useParams();
  const { user, isLoading } = useAuth0();
  const {
    data: lobby,
    isLoading: isLobbyLoading,
    refetch,
  } = useLobbyPrivateControllerGetLobby(lobbyId);
  useServerLobbyError(socket);
  const navigate = useNavigate();

  useEffect(() => {
    const gameInitializationDoneHandler = async ({
      game,
    }: {
      game: GameView;
    }) => {
      navigate({
        to: "/game/$gameId",
        params: { gameId: game.id },
      });
    };
    socket.on(
      ServerLobbyEvent.GameInitializationDone,
      gameInitializationDoneHandler,
    );

    socket.on(ServerLobbyEvent.LobbyChangesDetected, () => refetch());

    const handleUserLeftLobby = () => {
      navigate({ to: "/lobbies" });
    };
    socket.on(ServerLobbyEvent.UserLeftLobby, handleUserLeftLobby);

    return () => {
      socket.removeAllListeners();
    };
  }, [socket, navigate, refetch]);

  const isUserDataReady = (user?: User): user is User => {
    return isLoading === false && user !== undefined;
  };

  const isLobbyDataReady = (
    lobby?: GetLobbyOutputDto,
  ): lobby is GetLobbyOutputDto => {
    return isLobbyLoading === false && lobby !== undefined;
  };

  if (!isLobbyDataReady(lobby) || !isUserDataReady(user)) {
    return <div>Lobby data is loading</div>;
  }

  return <LobbyForm user={user} lobby={lobby} socket={socket} />;
}
