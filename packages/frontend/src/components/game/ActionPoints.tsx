import { Icon } from "../icon/Icon";
import { useGameContext } from "./context/GameContext/useGameContext";

export const ActionPoints = () => {
  const { isPlaying, heroPlaying } = useGameContext();

  if (!isPlaying || !heroPlaying) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-200 border border-sky-600">
        <Icon icon="roundStar" className="h-12 w-12 fill-blue-600 opacity-60" />
      </div>
      <span className="absolute text-2xl font-bold">
        {heroPlaying.characteristic.actionPoints}
      </span>
    </div>
  );
};
