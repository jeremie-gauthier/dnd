import { FileRoute } from '@tanstack/react-router';
import { Menu } from '../../components/menu/Menu';
import { useGetCampaigns } from '../../hooks/api/campaign/get-campaigns';

export const Route = new FileRoute('/_auth/menu').createRoute({
  component: MenuRouteComponent,
});

export function MenuRouteComponent() {
  const { auth } = Route.useRouteContext();
  const { data: campaigns = [] } = useGetCampaigns();

  return <Menu user={auth.user!} campaigns={campaigns} />;
}
