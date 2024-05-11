import { HeroClassType, PlayableHeroEntity } from "@dnd/shared";
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

const CLASS_TO_IMG: Readonly<Record<HeroClassType, string>> = {
  CLERIC: cleric,
  WARRIOR: warrior,
  SORCERER: sorcerer,
  THIEF: thief,
} as const;

type Props = {
  hero: Pick<PlayableHeroEntity, "class" | "id" | "name"> & {
    characteristic: {
      baseHealthPoints: number;
      baseArmorClass: number;
      baseMovementPoints: number;
      baseManaPoints: number;
      baseActionPoints: number;
    };
  };
};

export const HeroCard = ({ hero }: Props) => {
  return (
    <>
      <img src={CLASS_TO_IMG[hero.class]} alt="" width={200} className="h-64" />
      <h3 className="font-medium">{hero.name}</h3>
      <p>{hero.class.toLowerCase()}</p>
      <div className="flex gap-2">
        <div className="flex items-center">
          <HeartIcon className="h-5 w-5 text-red-500" />
          <span>{hero.characteristic.baseHealthPoints}</span>
        </div>

        <div className="flex items-center">
          <ShieldExclamationIcon className="h-5 w-5 text-gray-500" />
          <span>{hero.characteristic.baseArmorClass}</span>
        </div>

        <div className="flex items-center">
          <ChevronDoubleRightIcon className="h-5 w-5 text-green-500" />
          <span>{hero.characteristic.baseMovementPoints}</span>
        </div>

        <div className="flex items-center">
          <SparklesIcon className="h-5 w-5 text-blue-500" />
          <span>{hero.characteristic.baseManaPoints}</span>
        </div>

        <div className="flex items-center">
          <StarIcon className="h-5 w-5 text-yellow-500" />
          <span>{hero.characteristic.baseActionPoints}</span>
        </div>
      </div>
    </>
  );
};
