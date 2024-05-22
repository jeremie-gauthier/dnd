import { HeroClassType } from "../enums/hero-class.enum";

export type ItemManaCostJson = Partial<Record<HeroClassType, number>>;
