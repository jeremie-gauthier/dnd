import { User } from '@auth0/auth0-react';
import { ClientLobbyEvent } from '@dnd/shared';
import { useNavigate } from '@tanstack/react-router';
import { GetLobbyResponse } from '../../hooks/api/lobby/get-lobby';
import { ClientSocket } from '../../types/socket.type';

type Props = {
  user: User;
  lobby: GetLobbyResponse;
  socket: ClientSocket;
};

export const Lobby = ({ user, lobby, socket }: Props) => {
  const navigate = useNavigate();

  const handleClickOnLeaveLobby = async () => {
    await socket.emitWithAck(ClientLobbyEvent.RequestLeaveLobby);
    return navigate({
      to: `/lobbies`,
    });
  };

  const handleClickOnReady = () => {
    console.log('player is ready');
    // TODO: emit the "ready" signal
  };

  const handlePickHero = (heroId: string) => {
    socket.emit(ClientLobbyEvent.RequestPickHero, { lobbyId: lobby.id, heroId });
  };

  const handleDiscardHero = (heroId: string) => {
    socket.emit(ClientLobbyEvent.RequestDiscardHero, { lobbyId: lobby.id, heroId });
  };

  return (
    <div>
      <h1>Lobby</h1>
      <h2>
        {lobby.config.campaign.title} (
        <span>
          {lobby.config.campaign.stage.order}/{lobby.config.campaign.nbStages}
        </span>
        )
      </h2>

      <div>
        <h2>Players:</h2>
        <ul>
          {lobby.players.map((player) => {
            return (
              <li key={player.userId}>
                <p>Player {player.userId}</p>
                <ul>
                  <p>Heroes selected:</p>
                  {player.heroesSelected.map((heroSelected) => {
                    const hero = lobby.heroesAvailable.find(({ id }) => id === heroSelected);
                    if (!hero) return null;

                    return (
                      <li key={`${player.userId}-${heroSelected}`}>
                        {hero.name} ({hero.class})
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2>Choose your heroes:</h2>
        {lobby.heroesAvailable.map((hero) => (
          <div key={hero.id}>
            <h3>
              {hero.name} ({hero.class.toLowerCase()})
            </h3>
            {hero.pickedBy === undefined ? (
              <button onClick={() => handlePickHero(hero.id)}>Pick</button>
            ) : null}
            {hero.pickedBy === user.sub ? (
              <button onClick={() => handleDiscardHero(hero.id)}>Discard</button>
            ) : null}
          </div>
        ))}
      </div>

      <br />

      <button onClick={handleClickOnLeaveLobby}>Leave this lobby</button>
      <button onClick={handleClickOnReady}>I'm ready!</button>
    </div>
  );
};
