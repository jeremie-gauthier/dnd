import { ClientLobbyEvent } from '@dnd/shared';
import { useNavigate } from '@tanstack/react-router';
import { GetLobbiesResponse } from '../../../hooks/api/lobby/get-lobbies';
import { ClientSocket } from '../../../types/socket.type';

type Props = {
  lobbies: GetLobbiesResponse;
  socket: ClientSocket;
};

export const LobbiesMenu = ({ socket, lobbies }: Props) => {
  const navigate = useNavigate();

  const handleClickOnJoinLobby = async (lobbyId: GetLobbiesResponse[number]['id']) => {
    // TODO: API will check player availability in regard of this lobby level

    // With ack ??
    const result = await socket.emitWithAck(ClientLobbyEvent.RequestJoinLobby, { lobbyId });
    console.log(result);

    // TODO: if OK => navigate the user to the lobby page
    return navigate({
      to: `/lobby/$lobbyId`,
      params: { lobbyId },
    });
  };

  return (
    <ul>
      {lobbies.map((lobby) => (
        <li key={lobby.id}>
          <p>
            <b>{lobby.config.campaign.title}</b>
            <br />
            <i>{lobby.config.campaign.stage.title}</i>
          </p>
          {lobby.nbPlayers} / {lobby.config.nbPlayersMax}
          <button onClick={() => handleClickOnJoinLobby(lobby.id)}>Join this lobby</button>
        </li>
      ))}
    </ul>
  );
};
