import { withAuthenticationRequired } from "@auth0/auth0-react";
import { createFileRoute } from "@tanstack/react-router";
import { Game } from "../../components/game/Game";
import { ActionsLog } from "../../components/game/action-log/ActionsLog";
import { GameContextProvider } from "../../components/game/context/GameContext/GameContextProvider";
import { useGame } from "../../hooks/api/game/use-game";
import { useServerLobbyError } from "../../hooks/api/lobby/use-server-lobby-error";

export const Route = createFileRoute("/_ws/game/$gameId")({
  component: withAuthenticationRequired(GameRouteComponent),
});

export function GameRouteComponent() {
  const { socket, queryClient } = Route.useRouteContext();
  const { gameId } = Route.useParams();
  const {
    game,
    isLoading: isGameLoading,
    phase,
  } = useGame({ gameId, queryClient, socket });
  useServerLobbyError(socket);

  const isGameReady = !isGameLoading && game !== undefined;
  if (!isGameReady) {
    return <div>Game data is loading</div>;
  }

  return (
    <GameContextProvider game={game} phase={phase} socket={socket}>
      <div className="flex flex-col gap-12 items-center">
        <Game />
        <ActionsLog socket={socket} />
      </div>
    </GameContextProvider>
  );
}
