import { Icon } from "@features/ui";
import { useGameContext } from "./context/GameContext/useGameContext";

export const ArmourPoints = () => {
  const { isPlaying, entityPlaying } = useGameContext();

  if (!isPlaying || !entityPlaying) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full border bg-slate-200 border-slate-700">
        <Icon
          icon="shield"
          className="absolute fill-slate-700 opacity-60 w-12 h-12"
        />
      </div>
      <span className="absolute text-2xl font-bold">
        {entityPlaying.characteristic.armorClass}
      </span>
    </div>
  );
};
