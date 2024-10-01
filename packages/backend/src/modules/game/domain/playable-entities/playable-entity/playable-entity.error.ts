import { GameDomainError } from "../../game-domain.error";

type ErrorName =
  | "PLAYABLE_ENTITY_NOT_FOUND"
  | "BAD_OWNERSHIP"
  | "NOT_ENOUGH_ACTION_POINTS"
  | "NOT_ENOUGH_MANA_POINTS"
  | "CANNOT_CAST_SPELL"
  | "NOT_ALIVE"
  | "CANNOT_ATTACK_WITH_A_NON_ATTACK_ITEM"
  | "MONSTER_CANNOT_ATTACK_MORE_THAN_ONCE_PER_TURN"
  | "FORBIDDEN_ACTION"
  | "BAD_ROLE";

export class PlayableEntityError extends GameDomainError<ErrorName> {}
