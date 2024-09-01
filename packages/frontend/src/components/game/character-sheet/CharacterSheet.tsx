import { HeroClassType } from "@dnd/shared";
import cleric from "../../../assets/classes/cleric.webp";
import sorcerer from "../../../assets/classes/sorcerer.webp";
import thief from "../../../assets/classes/thief.webp";
import warrior from "../../../assets/classes/warrior.webp";
import { useGameContext } from "../context/GameContext/useGameContext";
import { CharacterIdentity } from "./CharacterIdentity";
import { CharacterInventory } from "./CharacterInventory";
import { CharacterStats } from "./CharacterStats";

const CLASS_TO_IMG: Readonly<Record<HeroClassType, string>> = {
  CLERIC: cleric,
  WARRIOR: warrior,
  SORCERER: sorcerer,
  THIEF: thief,
} as const;

export const CharacterSheet = () => {
  const { heroPlaying, playerState } = useGameContext();

  if (!heroPlaying || !playerState.canAct) {
    return null;
  }
  console.log(heroPlaying);

  return (
    <>
      {heroPlaying.faction === "hero" ? (
        <img
          src={CLASS_TO_IMG[heroPlaying.class]}
          alt=""
          className="absolute top-3 left-3 h-20"
        />
      ) : null}
      <div className="flex flex-row rounded-xl">
        <div className="flex flex-col pt-20 pb-4 bg-[#3B3D58] rounded-bl-md gap-4">
          <CharacterStats character={heroPlaying} />
        </div>

        <div className="flex flex-col bg-[#1B1D31] rounded-br-md">
          <div className="flex flex-row bg-[#3B3D58] pl-4 py-2">
            <CharacterIdentity character={heroPlaying} />
          </div>
          <div className="p-4">
            <CharacterInventory character={heroPlaying} />
          </div>
        </div>
      </div>
    </>
  );
};
