import { Icon } from "../icon/Icon";
import { useGameContext } from "./context/GameContext/useGameContext";

export const MovementPoints = () => {
  const { isPlaying, entityPlaying } = useGameContext();

  if (!isPlaying || !entityPlaying) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full border bg-emerald-200 border-green-700">
        <Icon
          icon="walkingBoot"
          className="absolute fill-green-700 opacity-60 w-12 h-12"
        />
      </div>
      <span className="absolute text-2xl font-bold">
        {entityPlaying.characteristic.movementPoints}
      </span>
    </div>
  );
};
