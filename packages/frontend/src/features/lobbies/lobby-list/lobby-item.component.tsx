import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar/user-avatar";
import { UserAvatarSkeleton } from "@/components/ui/user-avatar/user-avatar-skeleton";
import { ClientLobbyEvent } from "@dnd/shared";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { ClientSocket } from "../../../types/socket.type";
import { useUser } from "../hooks/use-user";
import type { GetLobbiesResponse } from "./use-get-lobbies";

type Props = {
  lobby: GetLobbiesResponse[number];
  socket: ClientSocket;
};

export const LobbyItem = ({ lobby, socket }: Props) => {
  const { t } = useTranslation(["campaigns", "lobbies"]);
  const navigate = useNavigate();
  const { data: lobbyHost } = useUser(lobby.host.userId);

  const handleClickOnJoinLobby = async (
    lobbyId: GetLobbiesResponse[number]["id"],
  ) => {
    // TODO: API will check player availability in regard of this lobby level

    await socket.emitWithAck(ClientLobbyEvent.RequestJoinLobby, { lobbyId });

    return navigate({
      to: "/lobby/$lobbyId",
      params: { lobbyId },
    });
  };

  return (
    <li className="flex flex-col p-2 rounded shadow-lg gap-2 w-96 border-2">
      <div>
        <div className="flex flex-row justify-between items-baseline">
          <h2 className="font-medium text-lg">
            {t(`${lobby.config.campaign.id}.title`)}
          </h2>
          <span className="ml-1 font-normal text-sm">
            (
            {t("campaignStageOverview", {
              stageOrder: lobby.config.campaign.stage.order,
              maxStageOrder: lobby.config.campaign.nbStages,
            })}
            )
          </span>
        </div>
        <p className="italic">
          {t(
            `${lobby.config.campaign.id}.stage_${lobby.config.campaign.stage.order}.title`,
          )}
        </p>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row-reverse items-center justify-end gap-x-2">
          {lobbyHost ? (
            <UserAvatar
              userName={lobbyHost.username}
              userPictureUrl={lobbyHost.avatarUrl}
            />
          ) : (
            <UserAvatarSkeleton />
          )}
        </div>
        <p className="text-sm font-semibold">
          {lobby.nbPlayers} / {lobby.config.nbPlayersMax}
        </p>
      </div>
      <Button
        variant="default"
        onClick={() => handleClickOnJoinLobby(lobby.id)}
      >
        {t("joinLobby", { ns: "lobbies" })}
      </Button>
    </li>
  );
};
