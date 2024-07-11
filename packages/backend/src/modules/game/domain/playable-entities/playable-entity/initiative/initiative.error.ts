import { GameDomainError } from "../../../game-domain.error";

type ErrorName = "NEGATIVE_INITIATIVE";

export class InitiativeError extends GameDomainError<ErrorName> {}
