import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FileRoute } from '@tanstack/react-router';
import { CreateLobbyForm } from '../../components/lobbies/create-lobby-form/CreateLobbyForm';
import { useGetCampaigns } from '../../hooks/api/campaign/get-campaigns';

export const Route = new FileRoute('/_ws/create-lobby').createRoute({
  component: withAuthenticationRequired(CreateLobbyRouteComponent),
});

export function CreateLobbyRouteComponent() {
  const { socket } = Route.useRouteContext();
  const { data: campaigns = [] } = useGetCampaigns();

  return <CreateLobbyForm campaigns={campaigns} socket={socket} />;
}
