import { GameDomainError } from "../../game-domain.error";

type ErrorName = "INVALID_USAGE";

export class PotionError extends GameDomainError<ErrorName> {}
