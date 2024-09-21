import { GameItem } from "@dnd/shared";
import { createContext } from "react";

type ActionBarContextParams = {
  selectedAttack: GameItem["attacks"][number] | null;
  clearSelectedAttack: () => void;
  selectAttack: (attack: GameItem["attacks"][number]) => void;
};

export const ActionBarContext = createContext<ActionBarContextParams>({
  selectedAttack: null,
} as ActionBarContextParams);
