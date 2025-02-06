import { HeroClass } from "./hero-class.enum";

export const SpellCasterHeroClass = {
  CLERIC: HeroClass.CLERIC,
  SORCERER: HeroClass.SORCERER,
} as const;

export const SpellCasterHeroClassValues = Object.values(SpellCasterHeroClass);

export type SpellCasterHeroClassType =
  (typeof SpellCasterHeroClass)[keyof typeof SpellCasterHeroClass];
