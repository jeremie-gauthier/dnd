import { Icon } from "../icon/Icon";
import { useGameContext } from "./context/GameContext/useGameContext";

export const MovementPoints = () => {
  const { isPlaying, heroPlaying } = useGameContext();

  if (!isPlaying || !heroPlaying) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center w-16 h-16 border bg-emerald-200 border-green-700 rounded-full">
      <Icon
        icon="walkingBoot"
        className="absolute fill-green-700 opacity-60 w-12 h-12"
      />
      <span className="absolute text-2xl font-bold">
        {heroPlaying.characteristic.movementPoints}
      </span>
    </div>
  );
};
