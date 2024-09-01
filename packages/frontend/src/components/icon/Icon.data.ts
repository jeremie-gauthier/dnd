import { IconBattleGear } from "./icons/IconBattleGear";
import { IconBrain } from "./icons/IconBrain";
import { IconHeart } from "./icons/IconHeart";
import { IconMeleeAttack } from "./icons/IconMeleeAttack";
import { IconOpenGate } from "./icons/IconOpenGate";
import { IconRangeAttack } from "./icons/IconRangeAttack";
import { IconRoundStar } from "./icons/IconRoundStar";
import { IconShield } from "./icons/IconShield";
import { IconTrashCan } from "./icons/IconTrashCan";
import { IconVersatileAttack } from "./icons/IconVersatileAttack";
import { IconWalkingBoot } from "./icons/IconWalkingBoot";
import { IconWizardStaff } from "./icons/IconWizardStaff";

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
} as const;
