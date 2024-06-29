import { HeroClassType } from "@dnd/shared";
import { BasePlayableEntity } from "./base-playable.type";

export type HeroEntity = BasePlayableEntity & {
  type: "hero";
  class: HeroClassType;
};
