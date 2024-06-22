import { GameItem } from "@dnd/shared";
import { PropsWithChildren, useEffect, useState } from "react";
import { useGameContext } from "../GameContext/useGameContext";
import { ActionTabContext } from "./ActionTabContext";

type Props = PropsWithChildren;

export const ActionTabContextProvider = ({ children }: Props) => {
  const { playerState } = useGameContext();
  const [selectedAttack, setSelectedAttack] = useState<
    GameItem["attacks"][number] | null
  >(null);

  const clearSelectedAttack = () => setSelectedAttack(null);
  const selectAttack = (attack: GameItem["attacks"][number]) =>
    setSelectedAttack(attack);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (playerState.currentAction !== "attack") {
      clearSelectedAttack();
    }
  }, [playerState.currentAction]);

  return (
    <ActionTabContext.Provider
      value={{ selectedAttack, clearSelectedAttack, selectAttack }}
    >
      {children}
    </ActionTabContext.Provider>
  );
};
