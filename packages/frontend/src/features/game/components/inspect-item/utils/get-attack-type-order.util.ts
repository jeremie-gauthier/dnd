import { GameItem } from "@dnd/shared";

export const getAttackTypeOrder = (
  attack: Extract<GameItem, { type: "Weapon" | "Spell" }>["attacks"][number],
) => {
  if (attack.type === "regular") {
    return 0;
  }
  return 1;
};
