import { GameDomainError } from "../../game-domain.error";

type ErrorName = "INVALID_USAGE" | "COULD_NOT_FOUND_ACCESSIBLE_TILE";

export class PotionError extends GameDomainError<ErrorName> {}
