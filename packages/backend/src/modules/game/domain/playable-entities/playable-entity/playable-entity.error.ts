import { GameDomainError } from "../../game-domain.error";

type ErrorName =
  | "PLAYABLE_ENTITY_NOT_FOUND"
  | "BAD_OWNERSHIP"
  | "NOT_ENOUGH_ACTION_POINTS"
  | "NOT_ALIVE";

export class PlayableEntityError extends GameDomainError<ErrorName> {}
