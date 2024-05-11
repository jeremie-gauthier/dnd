import { useGameContext } from "./context/useGameContext";

export const MovementPoints = () => {
  const { isPlaying, heroPlaying } = useGameContext();

  if (!isPlaying || !heroPlaying) {
    return null;
  }

  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-700 text-white">
      <span>{heroPlaying.characteristic.movementPoints}</span>
    </div>
  );
};
