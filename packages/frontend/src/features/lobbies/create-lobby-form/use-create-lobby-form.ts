import { ClientLobbyEvent } from "@dnd/shared";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { ClientSocket } from "../../../types/socket.type";
import { type GetCampaignsResponse } from "./use-get-campaigns";

type DefaultValues = {
  stageId: GetCampaignsResponse[number]["currentStage"]["id"];
};

type FormValues = {
  nbPlayersMax: number;
  stageId: GetCampaignsResponse[number]["currentStage"]["id"];
};

export const useCreateLobbyForm = (
  socket: ClientSocket,
  defaultValues: DefaultValues,
) => {
  const constraints = {
    nbPlayersMax: {
      min: 2,
      max: 5,
    },
  };

  const handleSubmit = async ({
    value: { nbPlayersMax, stageId },
  }: { value: FormValues }) => {
    await socket.emitWithAck(ClientLobbyEvent.RequestCreateLobby, {
      nbPlayersMax,
      stageId,
    });
  };

  const form = useForm({
    defaultValues: {
      ...defaultValues,
      nbPlayersMax: constraints.nbPlayersMax.min,
    },
    validatorAdapter: zodValidator(),
    onSubmit: handleSubmit,
  });

  const stageIdValidator = {
    onChange: z.string().uuid(),
  };

  const nbPlayersMaxValidator = {
    onChange: z
      .number()
      .min(
        constraints.nbPlayersMax.min,
        "Your lobby must at least accept 2 players",
      )
      .max(
        constraints.nbPlayersMax.max,
        "Your lobby must at most accept 5 players",
      ),
  };

  return {
    form,
    validators: {
      stageId: stageIdValidator,
      nbPlayersMax: nbPlayersMaxValidator,
    },
    constraints,
  };
};
