import { MagicHeroClassType } from "../enums/hero-class.enum";

export type ItemManaCostJson = Partial<Record<MagicHeroClassType, number>>;
