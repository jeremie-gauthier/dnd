import { ClientLobbyEvent } from "@dnd/shared";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { ClientSocket } from "../../../types/socket.type";
import { type GetCampaignsResponse } from "./use-get-campaigns";

type DefaultValues = {
  nbPlayersMax: number;
  campaign?: GetCampaignsResponse[number];
};

export const useCreateLobbyForm = (
  socket: ClientSocket,
  defaultValues: DefaultValues,
) => {
  const navigate = useNavigate();
  const handleSubmit = async ({
    value: { nbPlayersMax, campaign },
  }: { value: DefaultValues }) => {
    if (!campaign) return;

    const lobby = await socket.emitWithAck(
      ClientLobbyEvent.RequestCreateLobby,
      { nbPlayersMax, stageId: campaign.currentStage.id },
    );

    return navigate({
      to: "/lobby/$lobbyId",
      params: { lobbyId: lobby.id },
    });
  };

  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: handleSubmit,
  });

  const getCampaignDisplayedValue = (
    campaign: GetCampaignsResponse[number],
  ) => {
    return campaign
      ? `${campaign.title} (stage ${campaign.currentStage.order}/${campaign.nbStages})`
      : "";
  };

  const campaignValidators = {
    onChange: z.object({
      id: z.string().uuid(),
      currentStage: z.object({
        id: z.string().uuid(),
      }),
    }),
  };

  const nbPlayersMaxValidators = {
    onChange: z
      .number()
      .min(2, "Your lobby must at least accept 2 players")
      .max(5, "Your lobby must at most accept 5 players"),
  };

  return {
    form,
    getCampaignDisplayedValue,
    campaignValidators,
    nbPlayersMaxValidators,
  };
};
