import { Navbar } from "@/components/navbar/navbar.component";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ServerLobbyEvent, ServerToClientEvents } from "@dnd/shared";
import { Link, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { ClientSocket } from "../../../types/socket.type";
import { useCreateLobbyForm } from "./use-create-lobby-form";
import { type GetCampaignsResponse } from "./use-get-campaigns";

type Props = {
  campaigns: GetCampaignsResponse;
  socket: ClientSocket;
};

export const CreateLobbyForm = ({ campaigns, socket }: Props) => {
  const { t } = useTranslation(["lobbies", "campaigns", "common"]);
  const { form, validators, constraints } = useCreateLobbyForm(socket, {
    stageId: campaigns[0].currentStage.id,
  });
  const navigate = useNavigate();

  const handleLobbyCreation: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    await form.handleSubmit();
  };

  useEffect(() => {
    const handleLobbyCreated: ServerToClientEvents["server.lobby.create"] = ({
      lobby,
    }) => navigate({ to: "/lobby/$lobbyId", params: { lobbyId: lobby.id } });

    socket.on(ServerLobbyEvent.LobbyCreated, handleLobbyCreated);

    return () => {
      socket.removeAllListeners(ServerLobbyEvent.LobbyCreated);
    };
  }, [socket, navigate]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center gap-8">
        <h1 className="font-semibold text-2xl">{t("hostAGame")}</h1>

        <form onSubmit={handleLobbyCreation} className="space-y-6 w-60">
          <form.Field
            name="stageId"
            validatorAdapter={zodValidator()}
            validators={validators.stageId}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="stageId">{t("selectCampaign")}</Label>
                <Select
                  onValueChange={field.handleChange}
                  value={form.getFieldValue("stageId")}
                >
                  <SelectTrigger className="space-x-2">
                    <SelectValue placeholder={t("selectCampaign")} />
                  </SelectTrigger>
                  <SelectContent>
                    {campaigns.map((campaign) => (
                      <SelectItem
                        key={campaign.id}
                        value={campaign.currentStage.id}
                      >
                        {`${t(`${campaign.id}.title`, { ns: "campaigns" })} (${campaign.currentStage.order}/${campaign.nbStages})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>
          <form.Field
            name="nbPlayersMax"
            validatorAdapter={zodValidator()}
            validators={validators.nbPlayersMax}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="nbPlayersMax">{t("selectNbPlayers")}</Label>
                <div className="flex flex-row gap-2">
                  <span>{constraints.nbPlayersMax.min}</span>
                  <Slider
                    min={constraints.nbPlayersMax.min}
                    max={constraints.nbPlayersMax.max}
                    step={1}
                    onValueCommit={(value) => field.handleChange(value[0])}
                  />
                  <span>{constraints.nbPlayersMax.max}</span>
                </div>
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                className="w-full"
                variant="default"
                type="submit"
                disabled={!canSubmit}
              >
                {isSubmitting ? t("creatingLobby") : t("createLobby")}
              </Button>
            )}
          </form.Subscribe>
        </form>

        <Link to="/lobbies" className="-mt-6">
          <Button role="link" variant="outline" className="w-60">
            {t("back", { ns: "common" })}
          </Button>
        </Link>
      </div>
    </>
  );
};
