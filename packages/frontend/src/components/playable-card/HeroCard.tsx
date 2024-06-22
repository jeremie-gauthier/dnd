import { HeroClassType, LobbyView } from "@dnd/shared";
import {
  ChevronDoubleRightIcon,
  HeartIcon,
  ShieldExclamationIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import cleric from "../../assets/classes/cleric.webp";
import sorcerer from "../../assets/classes/sorcerer.webp";
import thief from "../../assets/classes/thief.webp";
import warrior from "../../assets/classes/warrior.webp";
import { useGetHeroDetails } from "../../hooks/api/campaign/get-hero-details";

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
      <p>{heroDetails.class.toLowerCase()}</p>
      <div className="flex gap-2">
        <div className="flex items-center">
          <HeartIcon className="h-5 w-5 text-red-500" />
          <span>{heroDetails.characteristic.baseHealthPoints}</span>
        </div>

        <div className="flex items-center">
          <ShieldExclamationIcon className="h-5 w-5 text-gray-500" />
          <span>{heroDetails.characteristic.baseArmorClass}</span>
        </div>

        <div className="flex items-center">
          <ChevronDoubleRightIcon className="h-5 w-5 text-green-500" />
          <span>{heroDetails.characteristic.baseMovementPoints}</span>
        </div>

        <div className="flex items-center">
          <SparklesIcon className="h-5 w-5 text-blue-500" />
          <span>{heroDetails.characteristic.baseManaPoints}</span>
        </div>

        <div className="flex items-center">
          <StarIcon className="h-5 w-5 text-yellow-500" />
          <span>{heroDetails.characteristic.baseActionPoints}</span>
        </div>
      </div>
    </>
  );
};
