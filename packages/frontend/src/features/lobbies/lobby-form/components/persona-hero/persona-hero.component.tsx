import { Icon } from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/ui/user-avatar/user-avatar";
import { type User } from "@auth0/auth0-react";
import { capitalize } from "@dnd/shared";
import { useUser } from "@features/lobbies/hooks/use-user";
import { useTranslation } from "react-i18next";
import { useGetHeroDetails } from "./use-get-hero-details";

type Props = {
  currentUser: User;
  hero: {
    type: "hero";
    id: string;
    pickedBy?: string | undefined;
  };
  onPickRole: (id: string) => void;
  onDiscardRole: (id: string) => void;
};

export const PersonaHero = ({
  currentUser,
  hero,
  onPickRole,
  onDiscardRole,
}: Props) => {
  const { t } = useTranslation(["lobbies", "heroes"]);
  const { data: userOwningRole } = useUser(hero.pickedBy);
  const { data: heroDetails } = useGetHeroDetails({ heroId: hero.id });

  const canBePicked = hero.pickedBy === undefined;
  const isPickedByMe = hero.pickedBy === currentUser.sub;

  return (
    <div className="flex flex-col p-2 rounded-md shadow-lg shadow-slate-300 justify-between max-w-fit">
      {heroDetails ? (
        <>
          <img
            src={heroDetails.imgUrl}
            alt=""
            width={200}
            className="h-64 rounded-md"
          />
          <h3 className="font-medium">{heroDetails.name}</h3>
          <p>
            {capitalize(
              t(heroDetails.class, { ns: "heroes" }).toLocaleLowerCase(),
            )}
          </p>
        </>
      ) : (
        <>
          <Skeleton className="w-[200px] h-64" />
          <Skeleton className="w-16 h-6" />
          <Skeleton className="w-20 h-6" />
        </>
      )}
      <div className="flex flex-row justify-evenly">
        <div className="flex items-center">
          <Icon icon="heart" className="fill-red-600" />
          {heroDetails ? (
            <span>{heroDetails.characteristic.baseHealthPoints}</span>
          ) : (
            <Skeleton className="w-[10px] h-6" />
          )}
        </div>

        <div className="flex items-center">
          <Icon icon="shield" className="fill-slate-700" />
          {heroDetails ? (
            <span>{heroDetails.characteristic.baseArmorClass}</span>
          ) : (
            <Skeleton className="w-[10px] h-6" />
          )}
        </div>

        <div className="flex items-center">
          <Icon icon="walkingBoot" className="fill-green-700" />
          {heroDetails ? (
            <span>{heroDetails.characteristic.baseMovementPoints}</span>
          ) : (
            <Skeleton className="w-[10px] h-6" />
          )}
        </div>

        <div className="flex items-center">
          <Icon icon="wizardStaff" className="fill-blue-600" />
          {heroDetails ? (
            <span>{heroDetails.characteristic.baseManaPoints}</span>
          ) : (
            <Skeleton className="w-[10px] h-6" />
          )}
        </div>

        <div className="flex items-center">
          <Icon icon="roundStar" className="fill-yellow-600" />
          {heroDetails ? (
            <span>{heroDetails.characteristic.baseActionPoints}</span>
          ) : (
            <Skeleton className="w-[10px] h-6" />
          )}
        </div>
      </div>

      <div className="flex flex-col">
        {canBePicked ? (
          <Button onClick={() => onPickRole(hero.id)}>{t("pick")}</Button>
        ) : null}

        {isPickedByMe ? (
          <Button onClick={() => onDiscardRole(hero.id)} variant="outline">
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
