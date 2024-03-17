import { withAuthenticationRequired } from "@auth0/auth0-react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu } from "../../components/menu/Menu";

export const Route = createFileRoute("/menu")({
  component: withAuthenticationRequired(MenuRouteComponent),
});

export function MenuRouteComponent() {
  return <Menu />;
}
