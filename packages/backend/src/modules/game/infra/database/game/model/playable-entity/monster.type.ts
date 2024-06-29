import { BasePlayableEntity } from "./base-playable.type";

export type MonsterEntity = BasePlayableEntity & {
  type: "monster";
  kind: "goblin";
};
