import { zodValidator } from "@tanstack/zod-form-adapter";
import type { GetCampaignsResponse } from "../../../hooks/api/campaign/get-campaigns";
import type { ClientSocket } from "../../../types/socket.type";
import { Button } from "../../shared/button/Button";
import { MinMaxRange } from "../../shared/range/MinMaxRange";
import { Select } from "../../shared/select/Select";
import { useCreateLobbyForm } from "./useCreateLobbyForm";

type Props = {
  campaigns: GetCampaignsResponse;
  socket: ClientSocket;
};

export const CreateLobbyForm = ({ campaigns, socket }: Props) => {
  const {
    form,
    getCampaignDisplayedValue,
    campaignValidators,
    nbPlayersMaxValidators,
  } = useCreateLobbyForm(socket, {
    nbPlayersMax: 2,
    campaign: campaigns[0],
  });

  const handleLobbyCreation: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    await form.handleSubmit();
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="font-semibold text-2xl">Host a game</h1>

      <form onSubmit={handleLobbyCreation} className="space-y-4">
        <div>
          <form.Field
            name="campaign"
            validatorAdapter={zodValidator}
            validators={campaignValidators}
          >
            {(field) => (
              <Select
                label="Select your campaign"
                value={field.state.value}
                list={campaigns}
                onChange={field.handleChange}
                getDisplayedValue={getCampaignDisplayedValue}
              />
            )}
          </form.Field>
        </div>

        <div className="relative !mb-6">
          <form.Field
            name="nbPlayersMax"
            validatorAdapter={zodValidator}
            validators={nbPlayersMaxValidators}
          >
            {(field) => (
              <>
                <MinMaxRange
                  min={2}
                  max={5}
                  value={field.state.value}
                  onChange={field.handleChange}
                  label="Select the number of players"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  2
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  3
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  4
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  5
                </span>
              </>
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Your Lobby is being created" : "Create Lobby"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};
