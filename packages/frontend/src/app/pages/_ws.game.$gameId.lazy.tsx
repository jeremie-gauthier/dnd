import { GameEnded } from "@features/game-ended/game-ended.component";
import { GameContextProvider } from "@features/game/context/game-context-provider";
import { Game } from "@features/game/game.component";
import { useGame } from "@features/game/use-game/use-game";
import { useServerLobbyError } from "@features/lobbies/use-server-lobby-error";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_ws/game/$gameId")({
  component: GameRouteComponent,
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
        <Game />
      ) : (
        <GameEnded gameConditionsStatus={"victory"} />
      )}
    </GameContextProvider>
  );
}
