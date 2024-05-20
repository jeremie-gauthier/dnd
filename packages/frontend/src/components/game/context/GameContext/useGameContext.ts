import { useContext } from "react";
import { GameContext } from "./GameContext";

export const useGameContext = () => {
  return useContext(GameContext);
};
