import { Navbar } from "@/components/navbar/navbar.component";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import type { ClientSocket } from "../../../types/socket.type";
import { LobbyItem } from "./lobby-item.component";
import type { GetLobbiesResponse } from "./use-get-lobbies";

type Props = {
  lobbies: GetLobbiesResponse;
  socket: ClientSocket;
};

export const LobbyList = ({ socket, lobbies }: Props) => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-xl font-semibold">
          Rejoins une partie ou héberges-en une
        </h1>

        <Link to="/create-lobby">
          <Button
            role="link"
            variant="ghost"
            className="rounded shadow-lg w-96 border-2 border-dashed h-12"
          >
            <h2>Héberger une partie</h2>
          </Button>
        </Link>

        <ul className="m-auto max-w-md space-y-4">
          {lobbies.map((lobby) => (
            <LobbyItem key={lobby.id} lobby={lobby} socket={socket} />
          ))}
        </ul>
      </div>
    </>
  );
};
