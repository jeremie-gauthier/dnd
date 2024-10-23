import { Icon } from "@/components/icon/Icon";
import { Navbar } from "@/components/navbar/navbar.component";
import { Button } from "@/components/ui/button";
import { type User } from "@auth0/auth0-react";
import { ClientLobbyEvent } from "@dnd/shared";
import { useTranslation } from "react-i18next";
import type { ClientSocket } from "../../../types/socket.type";
import { CampaignStageDescription } from "./components/campaign-stage-description.component";
import { PersonaGameMaster } from "./components/persona-game-master.component";
import { PersonaHero } from "./components/persona-hero/persona-hero.component";
import { PlayerList } from "./components/player-list/player-list.component";
import type { GetLobbyResponse } from "./use-get-lobby";

type Props = {
  user: User;
  lobby: GetLobbyResponse;
  socket: ClientSocket;
};

export const LobbyForm = ({ user, lobby, socket }: Props) => {
  const { t } = useTranslation(["lobbies", "campaigns"]);

  const handleClickOnLeaveLobby = async () => {
    await socket.emitWithAck(ClientLobbyEvent.RequestLeaveLobby);
  };

  const handleClickOnReady = () => {
    socket.emit(ClientLobbyEvent.RequestToggleReadyState, {
      lobbyId: lobby.id,
    });
  };

  const handlePickHero = (heroId: string) => {
    socket.emit(ClientLobbyEvent.RequestPickPlayableCharacter, {
      lobbyId: lobby.id,
      playableCharacterId: heroId,
    });
  };

  const handleDiscardHero = (heroId: string) => {
    socket.emit(ClientLobbyEvent.RequestDiscardPlayableCharacter, {
      lobbyId: lobby.id,
      playableCharacterId: heroId,
    });
  };

  const currentUserIsReady =
    lobby.players.find((player) => player.userId === user.sub)?.isReady ??
    false;

  const canStartGame =
    lobby.players.every(({ isReady }) => isReady) &&
    lobby.playableCharacters.every((pc) => !!pc.pickedBy);
  const handleStartGame = () => {
    socket.emit(ClientLobbyEvent.RequestStartLobby, { lobbyId: lobby.id });
  };

  const isLobbyHost = user.sub === lobby.host.userId;

  const gameMaster = lobby.playableCharacters.find(
    (pc) => pc.type === "game_master",
  )!;
  const heroes = lobby.playableCharacters.filter((pc) => pc.type === "hero");

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center gap-8 max-w-5xl m-auto">
        <CampaignStageDescription
          campaignId={lobby.config.campaign.id}
          campaignStageOrder={lobby.config.campaign.stage.order}
          campaignNbStages={lobby.config.campaign.nbStages}
        />

        <div className="flex flex-row">
          <div className="flex flex-col items-center gap-4">
            <PersonaGameMaster
              currentUser={user}
              gameMaster={gameMaster}
              onDiscardRole={handleDiscardHero}
              onPickRole={handlePickHero}
            />

            <Icon
              icon="crossedSwords"
              size="xlarge"
              className="fill-slate-900"
            />

            <ul className="flex flex-row gap-2">
              {heroes.map((hero) => (
                <PersonaHero
                  key={hero.id}
                  currentUser={user}
                  hero={hero}
                  onDiscardRole={handleDiscardHero}
                  onPickRole={handlePickHero}
                />
              ))}
            </ul>
          </div>

          <PlayerList
            players={lobby.players.map((player) => ({
              ...player,
              isHost: lobby.host.userId === player.userId,
            }))}
            nbPlayersMax={lobby.config.nbPlayersMax}
          />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={handleClickOnLeaveLobby}>
            {t("leave")}
          </Button>
          <Button
            variant={currentUserIsReady ? "outline" : "default"}
            onClick={handleClickOnReady}
          >
            {currentUserIsReady ? t("notReady") : t("ready")}
          </Button>

          {isLobbyHost ? (
            <Button onClick={handleStartGame} disabled={!canStartGame}>
              {t("startGame")}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};
