import { withAuthenticationRequired } from "@auth0/auth0-react";
import { createFileRoute } from "@tanstack/react-router";
import { MenuMultiplayer } from "../../components/menu/Multiplayer";

export const Route = createFileRoute("/_ws/menu-multiplayer")({
  component: withAuthenticationRequired(MenuMultiplayerRouteComponent),
});

export function MenuMultiplayerRouteComponent() {
  return <MenuMultiplayer />;
}
