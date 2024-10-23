import { ClientLobbyEvent } from "@dnd/shared";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation(["lobbies"]);

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
      .min(constraints.nbPlayersMax.min, t("createLobbyForm.errorMinNbPlayers"))
      .max(
        constraints.nbPlayersMax.max,
        t("createLobbyForm.errorMaxNbPlayers"),
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
