import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar/user-avatar";
import { type User } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { useUser } from "./player-list/use-user";

type Props = {
  currentUser: User;
  gameMaster: {
    type: "game_master";
    id: string;
    pickedBy?: string | undefined;
  };
  onPickRole: (id: string) => void;
  onDiscardRole: (id: string) => void;
};

export const PersonaGameMaster = ({
  currentUser,
  gameMaster,
  onPickRole,
  onDiscardRole,
}: Props) => {
  const { t } = useTranslation(["lobbies"]);
  const { data: userOwningRole } = useUser(gameMaster.pickedBy);

  const canBePicked = gameMaster.pickedBy === undefined;
  const isPickedByMe = gameMaster.pickedBy === currentUser.sub;

  return (
    <div className="flex flex-col p-2 rounded-md shadow-lg shadow-slate-300 justify-between max-w-fit">
      <div>
        <img
          src="https://jergauth-dnd-assets.s3.eu-west-3.amazonaws.com/game_master.webp"
          alt=""
          width={200}
          className="h-64 rounded-md"
        />
        <h3 className="font-medium">{t("gameMaster")}</h3>
        <div className="flex gap-2">
          <p>{t("gameMaster.description")}</p>
        </div>
      </div>

      <div className="flex flex-col">
        {canBePicked ? (
          <Button onClick={() => onPickRole(gameMaster.id)}>{t("pick")}</Button>
        ) : null}

        {isPickedByMe ? (
          <Button
            onClick={() => onDiscardRole(gameMaster.id)}
            variant="outline"
          >
            {t("discard")}
          </Button>
        ) : null}

        {!canBePicked && !isPickedByMe && userOwningRole ? (
          <div className="flex flex-row-reverse justify-center items-center h-10 gap-x-2 max-w-[190px]">
            <UserAvatar
              userName={userOwningRole.username}
              userPictureUrl={userOwningRole.avatarUrl}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
