import { useGameContext } from "./context/useGameContext";

export const HealthPoints = () => {
  const { isPlaying, heroPlaying } = useGameContext();

  if (!isPlaying || !heroPlaying) {
    return null;
  }

  return (
    <div className="flex items-center justify-center w-32 h-32 rounded-full bg-red-700 text-white">
      <span>
        {heroPlaying.characteristic.healthPoints} /{" "}
        {heroPlaying.characteristic.baseHealthPoints}
      </span>
    </div>
  );
};
