import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { GetCampaignsResponse } from "../../../hooks/api/campaign/get-campaigns";

type DefaultValues = {
  nbPlayersMax: number;
  campaign?: GetCampaignsResponse[number];
};

export const useCreateLobbyForm = (defaultValues: DefaultValues) => {
  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator,
  });

  return form;
};
