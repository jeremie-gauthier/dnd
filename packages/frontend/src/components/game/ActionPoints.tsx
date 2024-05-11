import { useGameContext } from "./context/useGameContext";

export const ActionPoints = () => {
  const { isPlaying, heroPlaying } = useGameContext();

  if (!isPlaying || !heroPlaying) {
    return null;
  }

  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-600 text-white">
      <span>{heroPlaying.characteristic.actionPoints}</span>
    </div>
  );
};
