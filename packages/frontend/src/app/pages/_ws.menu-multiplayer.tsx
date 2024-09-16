import { ChooseMultiplayerAction } from "@features/lobbies/choose-multiplayer-action/choose-multiplayer-action.component";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_ws/menu-multiplayer")({
  component: MenuMultiplayerRouteComponent,
});

export function MenuMultiplayerRouteComponent() {
  return <ChooseMultiplayerAction />;
}
