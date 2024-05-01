import { MagicHeroClassType } from "../enums/hero-class.enum";

export type ItemManaCost = Partial<Record<MagicHeroClassType, number>>;
