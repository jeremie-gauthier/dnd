import { ClientLobbyEvent } from '@dnd/shared';
import { useNavigate } from '@tanstack/react-router';
import { GetLobbyResponse } from '../../hooks/api/lobby/get-lobby';
import { ClientSocket } from '../../types/socket.type';

type Props = {
  lobby: GetLobbyResponse;
  socket: ClientSocket;
};

export const Lobby = ({ lobby, socket }: Props) => {
  const navigate = useNavigate();

  console.log(lobby);

  const handleClickOnLeaveLobby = async () => {
    console.log('leaving this lobby');

    await socket.emitWithAck(ClientLobbyEvent.RequestLeaveLobby);
    return navigate({
      to: `/lobbies`,
    });
  };

  const handleClickOnReady = () => {
    console.log('player is ready');
    // TODO: emit the "ready" signal
  };

  // const heroes = MOCK_HEROES;
  // const handleClickOnHero = (heroId: string) => {
  //   console.log(`hero ${heroId} selected or deselected`);
  //   // TODO: emit the "choose hero" signal
  // };

  return (
    <div>
      <h1>Lobby</h1>
      {/* <h2>
        {stage.campaign.title} (
        <span>
          {stage.order}/{stage.campaign.nbStages}
        </span>
        )
      </h2>
      <h2>{stage.title}</h2>

      <div>
        <h2>Players:</h2>
        <p>Player 1 (status)</p>
      </div>

      <div>
        <h2>Choose your hero(es):</h2>
        {heroes.map((hero) => (
          <button key={hero.id} onClick={() => handleClickOnHero(hero.id)}>
            {hero.name}
          </button>
        ))}
      </div> */}

      <button onClick={handleClickOnLeaveLobby}>Leave this lobby</button>
      <button onClick={handleClickOnReady}>I'm ready!</button>
    </div>
  );
};
