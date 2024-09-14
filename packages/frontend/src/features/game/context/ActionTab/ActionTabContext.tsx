import { GameItem } from "@dnd/shared";
import { createContext } from "react";

type ActionTabContextParams = {
  selectedAttack: GameItem["attacks"][number] | null;
  clearSelectedAttack: () => void;
  selectAttack: (attack: GameItem["attacks"][number]) => void;
};

export const ActionTabContext = createContext<ActionTabContextParams>({
  selectedAttack: null,
} as ActionTabContextParams);
