import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FileRoute } from '@tanstack/react-router';
import { MenuMultiplayer } from '../../components/menu/Multiplayer';

export const Route = new FileRoute('/_ws/menu-multiplayer').createRoute({
  component: withAuthenticationRequired(MenuMultiplayerRouteComponent),
});

export function MenuMultiplayerRouteComponent() {
  return <MenuMultiplayer />;
}
