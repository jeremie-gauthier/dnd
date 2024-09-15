import { withAuthenticationRequired } from "@auth0/auth0-react";
import { GameEnded } from "@features/game-ended/game-ended.component";
import { ActionsLog } from "@features/game/components/action-log/action-log-list.component";
import { GameContextProvider } from "@features/game/context/game.context";
import { Game } from "@features/game/game.component";
import { useGame } from "@features/game/use-game/use-game";
import { useServerLobbyError } from "@features/lobbies";
import { createFileRoute } from "@tanstack/react-router";

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
    gameConditionsStatus,
  } = useGame({ gameId, queryClient, socket });
  useServerLobbyError(socket);

  const isGameReady = !isGameLoading && game !== undefined;
  if (!isGameReady) {
    return <div>Game data is loading</div>;
  }

  return (
    <GameContextProvider game={game} phase={phase} socket={socket}>
      {gameConditionsStatus === "ongoing" ? (
        <div className="flex flex-col gap-12 items-center">
          <Game />
          <ActionsLog socket={socket} />
        </div>
      ) : (
        <GameEnded gameConditionsStatus={gameConditionsStatus} />
      )}
    </GameContextProvider>
  );
}
