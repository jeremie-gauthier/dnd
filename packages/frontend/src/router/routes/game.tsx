import { withAuthenticationRequired } from "@auth0/auth0-react";
import { FileRoute } from "@tanstack/react-router";
import { Game } from "../../components/game/Game";
import { useMap } from "../../components/map/hooks/useMap.hook";

export const Route = new FileRoute("/game").createRoute({
  component: withAuthenticationRequired(GameRouteComponent),
});

export function GameRouteComponent() {
  const map = useMap();
  const mockGame = {
    id: "mock-game-id",
    map,
    playableEntities: {},
    timeline: [],
  };

  return <Game game={mockGame} />;
}
