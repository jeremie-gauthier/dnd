import { GameDomainError } from "../../game-domain.error";

type ErrorName = "PLAYABLE_ENTITY_NOT_FOUND" | "BAD_OWNERSHIP";

export class PlayableEntityError extends GameDomainError<ErrorName> {}
