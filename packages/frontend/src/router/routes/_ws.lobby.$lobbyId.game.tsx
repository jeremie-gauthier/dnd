import { withAuthenticationRequired } from "@auth0/auth0-react";
import { createFileRoute } from "@tanstack/react-router";
import { Game } from "../../components/game/Game";
import { useGame } from "../../hooks/api/game/use-game";
import { useServerLobbyError } from "../../hooks/api/lobby/use-server-lobby-error";

export const Route = createFileRoute("/_ws/lobby/$lobbyId/game")({
  component: withAuthenticationRequired(GameRouteComponent),
});

export function GameRouteComponent() {
  const { socket } = Route.useRouteContext();
  const { game, isLoading: isGameLoading, phase } = useGame(socket);
  useServerLobbyError(socket);

  if (isGameLoading) {
    return <div>Game data is loading</div>;
  }

  return <Game game={game} phase={phase} />;
}
