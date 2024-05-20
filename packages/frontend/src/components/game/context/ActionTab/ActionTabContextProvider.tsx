import { GameItem } from "@dnd/shared";
import { PropsWithChildren, useState } from "react";
import { ActionTabContext } from "./ActionTabContext";

type Props = PropsWithChildren;

export const ActionTabContextProvider = ({ children }: Props) => {
  const [selectedAttack, setSelectedAttack] = useState<
    GameItem["attacks"][number] | null
  >(null);

  const clearSelectedAttack = () => setSelectedAttack(null);
  const selectAttack = (attack: GameItem["attacks"][number]) =>
    setSelectedAttack(attack);

  return (
    <ActionTabContext.Provider
      value={{ selectedAttack, clearSelectedAttack, selectAttack }}
    >
      {children}
    </ActionTabContext.Provider>
  );
};
