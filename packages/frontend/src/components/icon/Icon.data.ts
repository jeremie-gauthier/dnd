import { IconBrain } from "./icons/IconBrain";
import { IconHeart } from "./icons/IconHeart";
import { IconMeleeAttack } from "./icons/IconMeleeAttack";
import { IconOpenGate } from "./icons/IconOpenGate";
import { IconRangeAttack } from "./icons/IconRangeAttack";
import { IconRoundStar } from "./icons/IconRoundStar";
import { IconTrashCan } from "./icons/IconTrashCan";
import { IconVersatileAttack } from "./icons/IconVersatileAttack";
import { IconWalkingBoot } from "./icons/IconWalkingBoot";

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
} as const;
