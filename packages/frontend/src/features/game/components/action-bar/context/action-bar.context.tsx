import { GameItem } from "@dnd/shared";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useGameContext } from "../../../context/game.context";

type ActionBarContextParams = {
  selectedAttack: GameItem["attacks"][number] | null;
  clearSelectedAttack: () => void;
  selectAttack: (attack: GameItem["attacks"][number]) => void;
};

export const ActionBarContext = createContext<ActionBarContextParams>({
  selectedAttack: null,
} as ActionBarContextParams);

type Props = PropsWithChildren;

export const ActionBarContextProvider = ({ children }: Props) => {
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
    <ActionBarContext.Provider
      value={{ selectedAttack, clearSelectedAttack, selectAttack }}
    >
      {children}
    </ActionBarContext.Provider>
  );
};
