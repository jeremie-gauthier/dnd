import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ServerLobbyEvent } from "@dnd/shared";
import {
  CreateLobbyForm,
  type GetCampaignsResponse,
  useGetCampaigns,
} from "@features/lobbies";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_ws/create-lobby")({
  component: withAuthenticationRequired(CreateLobbyRouteComponent),
});

export function CreateLobbyRouteComponent() {
  const { socket } = Route.useRouteContext();
  const { data: campaigns, isLoading } = useGetCampaigns();

  useEffect(() => {
    // TODO: send a toast message instead
    const errorHandler = (payload: { name: string; message: string }) =>
      console.log(payload);

    socket.on(ServerLobbyEvent.Error, errorHandler);

    return () => {
      socket.removeListener(ServerLobbyEvent.Error, errorHandler);
    };
  }, [socket]);

  const isCampaignsDataReady = (
    campaigns?: GetCampaignsResponse,
  ): campaigns is GetCampaignsResponse => {
    return isLoading === false && campaigns !== undefined;
  };

  if (!isCampaignsDataReady(campaigns)) {
    return <div>Lobby form is loading</div>;
  }

  return <CreateLobbyForm campaigns={campaigns} socket={socket} />;
}
