import { type User } from "@auth0/auth0-react";
import { ClientLobbyEvent } from "@dnd/shared";
import { Button } from "@features/ui/button/button";
import { UserCard } from "@features/ui/user-card/user-card";
import { useTranslation } from "react-i18next";
import type { ClientSocket } from "../../../types/socket.type";
import { GameMasterCard } from "./playable-cards/game-master-card.component";
import { HeroCard } from "./playable-cards/hero-card.component";
import type { GetLobbyResponse } from "./use-get-lobby";

type Props = {
  user: User;
  lobby: GetLobbyResponse;
  socket: ClientSocket;
};

export const LobbyForm = ({ user, lobby, socket }: Props) => {
  const { t } = useTranslation(["lobbies"]);

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

  const canStartGame = lobby.players.every(({ isReady }) => isReady);
  const handleStartGame = () => {
    socket.emit(ClientLobbyEvent.RequestStartLobby, { lobbyId: lobby.id });
  };

  const isLobbyHost = user.sub === lobby.host.userId;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-medium text-lg">
        {lobby.config.campaign.title} ({lobby.config.campaign.stage.order}/
        {lobby.config.campaign.nbStages})
      </h1>

      <div>
        <h2 className="font-medium text-lg">{t("players")}</h2>
        <ul className="flex flex-row gap-6">
          {lobby.players.map((player) => {
            const isHost = lobby.host.userId === player.userId;

            return (
              <li
                key={player.userId}
                className="flex flex-col w-32 p-2 rounded shadow-lg"
              >
                <UserCard userId={player.userId} />
                <p className="text-sm">{isHost ? t("host") : t("guest")}</p>
                <p className="text-sm">
                  {player.isReady ? t("isReady") : t("isNotReady")}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="font-medium text-lg">{t("chooseYourRoles")}</h2>
        <div className="flex flex-row gap-6">
          {lobby.playableCharacters.map((playableCharacter) => {
            const canBePicked = playableCharacter.pickedBy === undefined;
            const isPickedByMe = playableCharacter.pickedBy === user.sub;

            return (
              <div
                key={playableCharacter.id}
                className="flex flex-col p-2 rounded shadow-lg justify-between"
              >
                <div>
                  {playableCharacter.type === "hero" ? (
                    <HeroCard hero={playableCharacter} />
                  ) : (
                    <GameMasterCard />
                  )}
                </div>

                <div className="flex flex-col">
                  {canBePicked ? (
                    <Button
                      onClick={() => handlePickHero(playableCharacter.id)}
                    >
                      {t("pick")}
                    </Button>
                  ) : null}
                  {isPickedByMe ? (
                    <Button
                      onClick={() => handleDiscardHero(playableCharacter.id)}
                      variant="outlined"
                    >
                      {t("discard")}
                    </Button>
                  ) : null}
                  {!canBePicked &&
                  !isPickedByMe &&
                  playableCharacter.pickedBy ? (
                    <div className="flex flex-row justify-center items-center gap-2 h-9 max-w-[190px]">
                      <UserCard userId={playableCharacter.pickedBy} />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outlined" onClick={handleClickOnLeaveLobby}>
          {t("leave")}
        </Button>
        <Button
          variant={currentUserIsReady ? "outlined" : "primary"}
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
  );
};
