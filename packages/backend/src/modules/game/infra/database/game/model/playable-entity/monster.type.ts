import { BasePlayableEntity } from "./base-playable.type";

export type MonsterEntity = BasePlayableEntity & {
  faction: "monster";
};
