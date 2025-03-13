import { GameDomainError } from "../../game-domain.error";

type ErrorName = "NOT_ALIVE" | "NOT_ENOUGH_ACTION_POINTS" | "BAD_OWNERSHIP";

export class PlayableEntityError extends GameDomainError<ErrorName> {}
