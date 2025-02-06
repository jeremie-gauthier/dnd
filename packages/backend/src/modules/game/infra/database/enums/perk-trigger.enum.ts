export const PerkTrigger = {
  SPECIAL_DICE: "special_dice",
  ONCE_PER_ATTACK: "once_per_attack",
} as const;

export const PerkTriggerValues = Object.values(PerkTrigger);

export type PerkTriggerType = (typeof PerkTrigger)[keyof typeof PerkTrigger];
