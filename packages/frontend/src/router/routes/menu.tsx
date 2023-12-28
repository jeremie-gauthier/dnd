import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FileRoute } from '@tanstack/react-router';
import { Menu } from '../../components/menu/Menu';
import { useGetCampaigns } from '../../hooks/api/campaign/get-campaigns';

export const Route = new FileRoute('/menu').createRoute({
  component: withAuthenticationRequired(MenuRouteComponent),
});

export function MenuRouteComponent() {
  const { data: campaigns = [] } = useGetCampaigns();

  return <Menu campaigns={campaigns} />;
}
