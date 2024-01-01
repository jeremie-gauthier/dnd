import { GetLobbyResponse, MOCK_HEROES } from '../../hooks/api/lobby/get-lobby';

type Props = {
  lobby: GetLobbyResponse;
};

export const Lobby = ({ lobby }: Props) => {
  const handleClickOnLeaveLobby = () => {
    console.log('leaving this lobby');
    // TODO: disconnect socket from this lobby group
  };

  const handleClickOnReady = () => {
    console.log('player is ready');
    // TODO: emit the "ready" signal
  };

  const heroes = MOCK_HEROES;
  const handleClickOnHero = (heroId: string) => {
    console.log(`hero ${heroId} selected or deselected`);
    // TODO: emit the "choose hero" signal
  };

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
