import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ChooseMultiplayerAction } from "@features/lobbies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_ws/menu-multiplayer")({
  component: withAuthenticationRequired(MenuMultiplayerRouteComponent),
});

export function MenuMultiplayerRouteComponent() {
  return <ChooseMultiplayerAction />;
}
