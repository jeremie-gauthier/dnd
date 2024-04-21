import { withAuthenticationRequired } from "@auth0/auth0-react";
import { createFileRoute } from "@tanstack/react-router";
import { Game } from "../../components/game/Game";
import { useFakeUserGameState } from "../../components/map/hooks/useFakeUserGameState";

export const Route = createFileRoute("/game-test")({
  component: withAuthenticationRequired(GameTestRouteComponent),
});

export function GameTestRouteComponent() {
  const fakeUserGameState = useFakeUserGameState();

  return (
    <Game
      game={fakeUserGameState.game}
      phase={fakeUserGameState.playerPhase}
      actionHandlers={{
        move: (payload) => console.log(payload),
      }}
    />
  );
}
