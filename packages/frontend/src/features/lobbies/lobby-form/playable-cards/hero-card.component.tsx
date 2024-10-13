import cleric from "@assets/classes/cleric.webp";
import sorcerer from "@assets/classes/sorcerer.webp";
import thief from "@assets/classes/thief.webp";
import warrior from "@assets/classes/warrior.webp";
import { HeroClassType, LobbyView, capitalize } from "@dnd/shared";
import { Icon } from "@features/ui/icon/Icon";
import { useTranslation } from "react-i18next";
import { useGetHeroDetails } from "./use-get-hero-details";

const CLASS_TO_IMG: Readonly<Record<HeroClassType, string>> = {
  CLERIC: cleric,
  WARRIOR: warrior,
  SORCERER: sorcerer,
  THIEF: thief,
} as const;

type Props = {
  hero: LobbyView["playableCharacters"][number];
};

export const HeroCard = ({ hero }: Props) => {
  const { t } = useTranslation(["heroes"]);

  const { data: heroDetails, isLoading } = useGetHeroDetails({
    heroId: hero.id,
  });

  if (!heroDetails || isLoading) {
    return null;
  }

  return (
    <>
      <img
        src={CLASS_TO_IMG[heroDetails.class]}
        alt=""
        width={200}
        className="h-64"
      />
      <h3 className="font-medium">{heroDetails.name}</h3>
      <p>{capitalize(t(heroDetails.class).toLocaleLowerCase())}</p>
      <div className="flex gap-2">
        <div className="flex items-center">
          <Icon icon="heart" className="fill-red-600" />
          <span>{heroDetails.characteristic.baseHealthPoints}</span>
        </div>

        <div className="flex items-center">
          <Icon icon="shield" className="fill-slate-700" />
          <span>{heroDetails.characteristic.baseArmorClass}</span>
        </div>

        <div className="flex items-center">
          <Icon icon="walkingBoot" className="fill-green-700" />
          <span>{heroDetails.characteristic.baseMovementPoints}</span>
        </div>

        <div className="flex items-center">
          <Icon icon="wizardStaff" className="fill-blue-600" />
          <span>{heroDetails.characteristic.baseManaPoints}</span>
        </div>

        <div className="flex items-center">
          <Icon icon="roundStar" className="fill-yellow-600" />
          <span>{heroDetails.characteristic.baseActionPoints}</span>
        </div>
      </div>
    </>
  );
};
