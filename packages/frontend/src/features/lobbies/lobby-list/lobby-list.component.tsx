import { Navbar } from "@/components/navbar/navbar.component";
import { Button } from "@/components/ui/button";
import { GetLobbiesOutputDto } from "@/openapi/dnd-api";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { ClientSocket } from "../../../types/socket.type";
import { LobbyItem } from "./lobby-item.component";

type Props = {
  lobbies: GetLobbiesOutputDto;
  socket: ClientSocket;
};

export const LobbyList = ({ socket, lobbies }: Props) => {
  const { t } = useTranslation(["lobbies"]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-xl font-semibold">{t("lobbies.title")}</h1>

        <Link to="/create-lobby">
          <Button
            role="link"
            variant="ghost"
            className="rounded shadow-lg w-96 border-2 border-dashed h-12"
          >
            <h2>{t("lobbies.create")}</h2>
          </Button>
        </Link>

        <ul className="m-auto max-w-md space-y-4">
          {lobbies.data.map((lobby) => (
            <LobbyItem key={lobby.id} lobby={lobby} socket={socket} />
          ))}
        </ul>
      </div>
    </>
  );
};
