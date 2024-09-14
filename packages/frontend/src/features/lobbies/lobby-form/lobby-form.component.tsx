import { type User } from "@auth0/auth0-react";
import { ClientLobbyEvent } from "@dnd/shared";
import { Button, UserCard } from "@features/ui";
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
        <h2 className="font-medium text-lg">Players:</h2>
        <ul className="flex flex-row gap-6">
          {lobby.players.map((player) => {
            const isHost = lobby.host.userId === player.userId;

            return (
              <li
                key={player.userId}
                className="flex flex-col w-32 p-2 rounded shadow-lg"
              >
                <UserCard userId={player.userId} />
                <p className="text-sm">{isHost ? "Host" : "Guest"}</p>
                <p className="text-sm">
                  {player.isReady ? "Ready" : "Not ready"}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="font-medium text-lg">Choose your heroes:</h2>
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
                      Pick
                    </Button>
                  ) : null}
                  {isPickedByMe ? (
                    <Button
                      onClick={() => handleDiscardHero(playableCharacter.id)}
                      variant="outlined"
                    >
                      Discard
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
          Leave this lobby
        </Button>
        <Button
          variant={currentUserIsReady ? "outlined" : "primary"}
          onClick={handleClickOnReady}
        >
          {currentUserIsReady ? "I'm not ready" : "I'm ready!"}
        </Button>

        {isLobbyHost ? (
          <Button onClick={handleStartGame} disabled={!canStartGame}>
            Start game
          </Button>
        ) : null}
      </div>
    </div>
  );
};
