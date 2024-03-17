import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ServerLobbyEvent } from "@dnd/shared";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CreateLobbyForm } from "../../components/lobbies/create-lobby-form/CreateLobbyForm";
import { useGetCampaigns } from "../../hooks/api/campaign/get-campaigns";

export const Route = createFileRoute("/_ws/create-lobby")({
  component: withAuthenticationRequired(CreateLobbyRouteComponent),
});

export function CreateLobbyRouteComponent() {
  const { socket } = Route.useRouteContext();
  const { data: campaigns = [] } = useGetCampaigns();

  useEffect(() => {
    // TODO: send a toast message instead
    const errorHandler = (payload: { name: string; message: string }) =>
      console.log(payload);

    socket.on(ServerLobbyEvent.Error, errorHandler);

    return () => {
      socket.removeListener(ServerLobbyEvent.Error, errorHandler);
    };
  }, [socket]);

  return <CreateLobbyForm campaigns={campaigns} socket={socket} />;
}
