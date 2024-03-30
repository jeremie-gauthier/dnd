import { ClientLobbyEvent } from "@dnd/shared";
import { useNavigate } from "@tanstack/react-router";
import type { GetLobbiesResponse } from "../../../hooks/api/lobby/get-lobbies";
import type { ClientSocket } from "../../../types/socket.type";
import { Button } from "../../shared/button/Button";
import { UserCard } from "../../user-card/UserCard";

type Props = {
  lobbies: GetLobbiesResponse;
  socket: ClientSocket;
};

export const LobbiesMenu = ({ socket, lobbies }: Props) => {
  const navigate = useNavigate();

  const handleClickOnJoinLobby = async (
    lobbyId: GetLobbiesResponse[number]["id"],
  ) => {
    // TODO: API will check player availability in regard of this lobby level

    // With ack ??
    const result = await socket.emitWithAck(ClientLobbyEvent.RequestJoinLobby, {
      lobbyId,
    });
    console.log(result);

    // TODO: if OK => navigate the user to the lobby page
    return navigate({
      to: "/lobby/$lobbyId",
      params: { lobbyId },
    });
  };

  return (
    <ul className="m-auto max-w-md space-y-4">
      {lobbies.map((lobby) => (
        <li
          key={lobby.id}
          className="flex flex-col p-2 rounded shadow-lg gap-2 w-96"
        >
          <div>
            <h2 className="font-medium text-lg">
              {lobby.config.campaign.title}
            </h2>
            <p className="italic">{lobby.config.campaign.stage.title}</p>
          </div>

          <div className="flex flex-row items-baseline justify-between">
            <div className="flex flex-row items-baseline">
              <UserCard userId={lobby.host.userId} size="xs" />
            </div>
            <p>
              {lobby.nbPlayers} / {lobby.config.nbPlayersMax}
            </p>
          </div>
          <Button onClick={() => handleClickOnJoinLobby(lobby.id)}>
            Join this lobby
          </Button>
        </li>
      ))}
    </ul>
  );
};
