import { useGameContext } from "../context/GameContext/useGameContext";
import { ActionTab } from "./ActionTab";

export const ActionBar = () => {
  const { isPlaying, heroPlaying } = useGameContext();

  if (!isPlaying || !heroPlaying) return null;

  return (
    <ActionTab
      gear={heroPlaying.inventory.gear}
      storageCapacity={heroPlaying.inventory.storageCapacity}
    />
  );
};
