import { Icon } from "@/components/icon/Icon";

type Props = {
  dice: {
    name: string;
  };
};

export const Dice = ({ dice }: Props) => {
  return <Icon icon="dice" size="xlarge" className={diceColor[dice.name]} />;
};

const diceColor: Record<string, string> = {
  yellow: "fill-dice-yellow",
  orange: "fill-dice-orange",
  red: "fill-dice-red",
  purple: "fill-dice-purple",
  special: "fill-dice-special",
  disarm_trap: "fill-dice-disarm-trap",
  detect_trap: "fill-dice-detect-trap",
  turn_undead: "fill-dice-turn-undead",
};
