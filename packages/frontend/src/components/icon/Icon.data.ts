import { IconBattleGear } from "./icons/IconBattleGear";
import { IconCrossedSwords } from "./icons/IconCrossedSwords";
import { IconCrown } from "./icons/IconCrown";
import { IconDice } from "./icons/IconDice";
import { IconHand } from "./icons/IconHand";
import { IconHeart } from "./icons/IconHeart";
import { IconKnapsack } from "./icons/IconKnapsack";
import { IconOpenChest } from "./icons/IconOpenChest";
import { IconRoundStar } from "./icons/IconRoundStar";
import { IconShield } from "./icons/IconShield";
import { IconWalkingBoot } from "./icons/IconWalkingBoot";
import { IconWizardStaff } from "./icons/IconWizardStaff";
import { IconX } from "./icons/IconX";

export const iconMapping = {
  walkingBoot: IconWalkingBoot,
  heart: IconHeart,
  roundStar: IconRoundStar,
  battleGear: IconBattleGear,
  wizardStaff: IconWizardStaff,
  shield: IconShield,
  knapsack: IconKnapsack,
  hand: IconHand,
  x: IconX,
  openChest: IconOpenChest,
  dice: IconDice,
  crown: IconCrown,
  crossedSwords: IconCrossedSwords,
} as const;
