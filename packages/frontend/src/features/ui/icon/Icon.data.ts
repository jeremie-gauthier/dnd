import { IconBattleGear } from "./icons/IconBattleGear";
import { IconBrain } from "./icons/IconBrain";
import { IconChevronUpDown } from "./icons/IconChevronUpDown";
import { IconDice } from "./icons/IconDice";
import { IconHand } from "./icons/IconHand";
import { IconHeart } from "./icons/IconHeart";
import { IconKnapsack } from "./icons/IconKnapsack";
import { IconMeleeAttack } from "./icons/IconMeleeAttack";
import { IconOpenChest } from "./icons/IconOpenChest";
import { IconOpenGate } from "./icons/IconOpenGate";
import { IconRangeAttack } from "./icons/IconRangeAttack";
import { IconRoundStar } from "./icons/IconRoundStar";
import { IconShield } from "./icons/IconShield";
import { IconTrashCan } from "./icons/IconTrashCan";
import { IconVersatileAttack } from "./icons/IconVersatileAttack";
import { IconWalkingBoot } from "./icons/IconWalkingBoot";
import { IconWizardStaff } from "./icons/IconWizardStaff";
import { IconX } from "./icons/IconX";

export const iconMapping = {
  meleeAttack: IconMeleeAttack,
  rangeAttack: IconRangeAttack,
  versatileAttack: IconVersatileAttack,
  openGate: IconOpenGate,
  walkingBoot: IconWalkingBoot,
  heart: IconHeart,
  roundStar: IconRoundStar,
  brain: IconBrain,
  trashCan: IconTrashCan,
  battleGear: IconBattleGear,
  wizardStaff: IconWizardStaff,
  shield: IconShield,
  knapsack: IconKnapsack,
  hand: IconHand,
  x: IconX,
  openChest: IconOpenChest,
  dice: IconDice,
  chevronUpDown: IconChevronUpDown,
} as const;
