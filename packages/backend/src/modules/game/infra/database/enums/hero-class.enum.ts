export const HeroClass = {
  WARRIOR: "WARRIOR",
  CLERIC: "CLERIC",
  SORCERER: "SORCERER",
  THIEF: "THIEF",
} as const;

export const HeroClassValues = Object.values(HeroClass);

export type HeroClassType = (typeof HeroClass)[keyof typeof HeroClass];

export type MagicHeroClassType = Extract<HeroClassType, "CLERIC" | "SORCERER">;
